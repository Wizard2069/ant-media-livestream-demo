import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, Input, OnChanges, SimpleChanges} from '@angular/core';

import {WebRTCAdaptor} from '../../../../assets/js/webrtc_adaptor.js';
import {CustomKeycloakProfile, Message, MessagePayload} from '../../../types';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';

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
    
    public messages: Message[] = [];
    
    private ws: WebSocket;
    
    private userProfile: KeycloakProfile | CustomKeycloakProfile | null = null;

    constructor(private keycloak: KeycloakService) {
    }

    ngOnInit(): void {
        this.ws = new WebSocket('ws://localhost:8080/messages');
        this.ws.onopen = () => {
            console.log('ws connected');
        };
        this.ws.onerror = (e) => {
            console.log('Error occurred: ' + JSON.stringify(e));
        };
        this.ws.onclose = () => {
            console.log('ws closed');
        };
        this.keycloak.loadUserProfile()
            .then(profile => this.userProfile = profile);
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if (this.messageData) {
            this.messages.push({
                ...this.messageData,
                time: new Date(this.messageData.time),
                type: 'other'
            });
            this.ws.send(JSON.stringify({
                streamId: this.streamId,
                ...this.messageData
            }));
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
    
    onChange(e: Event): void {
        this.submitted = false;
        this.handleResize();
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
                    // @ts-ignore
                    avatar: this.userProfile.attributes.picture[0] 
                },
                msg: this.message,
                time: new Date()
            };
            this.webRTCAdaptor.sendData(this.streamId, JSON.stringify(sendData));
            this.messages.push({
                ...sendData,
                type: 'me'
            });
        }
        this.submitting = false;
    }
}
