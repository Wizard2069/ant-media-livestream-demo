import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, Input, OnChanges, SimpleChanges} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';
import * as moment from 'moment';

import {WebRTCAdaptor} from '../../../../assets/js/webrtc_adaptor.js';
import {CustomKeycloakProfile, MessagePayload} from '../../../types';
import {MessageHistoryService} from '../../../data/service/message-history.service';

@Component({
    selector: 'app-chat-box',
    templateUrl: './chat-box.component.html',
    styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit, AfterViewInit, OnChanges {

    @ViewChild('title') titleView: ElementRef;

    @ViewChild('messageInput') messageInputView: ElementRef;

    @Input() webRTCAdaptor: WebRTCAdaptor;

    @Input() streamId: string;

    @Input() messageData: MessagePayload;

    public chatBoxHeight: number;

    public submitting = false;

    public message: string;

    public submitted = false;

    public messages: MessagePayload[] = [];

    private ws: WebSocket;

    private userProfile: KeycloakProfile | CustomKeycloakProfile | null = null;
    
    private currentPage = 1;
    private size = 5;
    private totalPages;

    constructor(
        private keycloak: KeycloakService,
        private messageHistory: MessageHistoryService
    ) {
    }

    ngOnInit(): void {
        const token = this.keycloak.getKeycloakInstance().token;
        this.ws = new WebSocket('ws://localhost:8080/messages', [
            'access_token', token
        ]);
        this.ws.onopen = () => {
            console.log('ws connected');
        };
        this.ws.onerror = (e) => {
            console.log('Error occurred: ' + JSON.stringify(e));
        };
        this.ws.onclose = (e) => {
            console.log(e);
            console.log('ws closed');
        };
        this.keycloak.loadUserProfile()
            .then(profile => this.userProfile = profile);
        
        this.messageHistory.getMessageHistory(this.streamId, 1, this.size)
            .subscribe(data => {
                this.messages = data._embedded.messageList;
                this.totalPages = data.page.totalPages;
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.messageData) {
            this.messages.push({
                ...this.messageData,
                time: new Date(this.messageData.time)
            });
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.handleResize();
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: DocumentEvent): void {
        this.handleResize();
    }

    handleResize(): void {
        if (window.innerWidth <= 1200 && window.innerWidth > 992 || window.innerWidth > 1200) {
            const wrapperHeight = document.querySelector('.chat-box-wrapper').getBoundingClientRect().height;

            const titleHeight = this.titleView.nativeElement.offsetHeight;
            const messageInputHeight = this.messageInputView.nativeElement.offsetHeight;
            this.chatBoxHeight = wrapperHeight - titleHeight - messageInputHeight;
        }
    }
    
    onScrollDown(): void {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.messageHistory.getMessageHistory(this.streamId, this.currentPage, this.size)
                .subscribe(data => {
                    this.messages = [
                        ...this.messages,
                        ...data._embedded.messageList
                    ];
                });
        }
    }
    
    onScrollUp(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }
    
    toTimeDiff(time: string): string {
        if (moment(new Date()).diff(time, 'days') > 0) {
            return moment(time).fromNow();
        }

        return moment(time).format('HH:mm');
    }

    onChange(e: Event): void {
        this.handleResize();
        this.submitted = false;
        // @ts-ignore
        this.message = e.target.outerText.trim();
        this.submitting = this.message.length !== 0;
    }

    onSubmit(): void {
        this.submitting = true;
        if (this.message?.length !== 0) {
            this.submitted = true;
            this.messageInputView.nativeElement.querySelector('.input').textContent = '';

            const sendData = {
                sender: {
                    name: this.userProfile.firstName + ' ' + this.userProfile.lastName,
                    email: this.userProfile.email,
                    // @ts-ignore
                    avatar: this.userProfile.attributes.picture[0]
                },
                msg: this.message,
                time: new Date()
            };

            this.webRTCAdaptor.sendData(this.streamId, JSON.stringify(sendData));
            this.messages.push(sendData);

            this.ws.send(JSON.stringify({
                streamId: this.streamId,
                ...sendData
            }));
        }
        this.submitting = false;
        this.handleResize();
    }
}
