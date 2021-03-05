import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-chat-box',
    templateUrl: './chat-box.component.html',
    styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit, AfterViewInit {
    
    @ViewChild('title') titleView: ElementRef;
    
    @ViewChild('messageInput') messageInputView: ElementRef;
    
    public chatBoxHeight: number;

    constructor() {
    }

    ngOnInit(): void {
    }
    
    @HostListener('window:resize', ['$event'])
    onResize(event: DocumentEvent): void {
        this.handleResize();
    }
    
    ngAfterViewInit(): void {
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
    
    onChange(e: InputEvent): void {
        this.handleResize();
        // @ts-ignore
        console.log(e.target.outerText);
    }
}
