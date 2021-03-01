import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';

import {WebRtcService} from '../../service/web-rtc.service';
import {WebRTCAdaptor} from '../../../../assets/js/webrtc_adaptor.js';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, AfterViewInit, OnDestroy {
    
    private webRTCAdaptor: WebRTCAdaptor;

    public startStream: boolean;
    
    public streamId = 'stream1';

    constructor(private webRTCService: WebRtcService) {
        this.webRTCService.additionalConfig = {
            localVideoId: 'localVideo'
        };
    }
    
    ngOnInit(): void {
        console.log('init');
    }
    
    ngAfterViewInit(): void {
        console.log('after view init');
        this.webRTCService.initWebRTCAdaptor();
        this.webRTCAdaptor = this.webRTCService.getWebRTCAdaptor;
    }
    
    ngOnDestroy(): void {
        console.log('destroy');
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
}
