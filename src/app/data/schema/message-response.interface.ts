import {MessagePayload} from '../../types';

export interface MessageResponse {
    _embedded: {
        messageList: (MessagePayload & {
            id: string,
            streamId: string
        })[]
    };
    page: {
        size: number,
        totalElements: number,
        totalPages: number,
        number: number
    };
}
