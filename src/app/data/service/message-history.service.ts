import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {MessageResponse} from '../schema/message-response.interface';

@Injectable()
export class MessageHistoryService {
    
    constructor(private http: HttpClient) {
    }
    
    getMessageHistory(streamId: string, page = 1, limit = 10): Observable<MessageResponse> {
        return this.http.get<MessageResponse>(
            `http://localhost:8080/api/v1/streams/${streamId}/message-history`,
            {
                params: new HttpParams({
                    fromObject: {
                        page: page.toString(),
                        limit: limit.toString()
                    }
                })
            }
        )
            .pipe(
                map((response: MessageResponse) => {
                    const messageList = response._embedded.messageList
                        .map(message => {
                            return {
                                ...message,
                                time: new Date(message.time)
                            };
                        });
                    
                    return {
                        ...response,
                        _embedded: {
                            messageList
                        }
                    };
                }),
                catchError((err: HttpErrorResponse) => {
                    console.log(err?.error?.message);

                    return throwError('Error occurred');
                })
            );
    }
}
