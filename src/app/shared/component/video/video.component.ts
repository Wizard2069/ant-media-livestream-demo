import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {WebRtcService} from '../../service/web-rtc.service';
import {WebRTCAdaptor} from '../../../../assets/js/webrtc_adaptor.js';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, AfterViewInit, OnDestroy {
    
    private webRTCAdaptor: WebRTCAdaptor;

    public startStream = false;
    
    public streamId = 'stream1';

    constructor(private webRTCService: WebRtcService) {
    }
    
    ngOnInit(): void {
        this.webRTCService.additionalConfig = {
            localVideoId: 'localVideo'
        };
    }
    
    ngAfterViewInit(): void {
        this.webRTCService.handleError = () => {
            this.startStream = false;  
        };
        this.webRTCService.handleInit = () => {
            
        };
        this.webRTCService.initWebRTCAdaptor();
        this.webRTCAdaptor = this.webRTCService.getWebRTCAdaptor;
    }

    ngOnDestroy(): void {
        this.webRTCAdaptor.closeStream();
        this.webRTCAdaptor.closeWebSocket();
    }
    
    onStartStream(): void {
        this.webRTCAdaptor.publish(this.streamId, null);
        this.startStream = true;
    }
    
    onStopStream(): void {
        this.webRTCAdaptor.stop(this.streamId);
        this.webRTCAdaptor.closePeerConnection(this.streamId);
        this.startStream = false;
    }
    
    onMute(mute): void {
        if (mute) {
            this.webRTCAdaptor.muteLocalMic();
        } else {
            this.webRTCAdaptor.unmuteLocalMic();
        }
    }
}
