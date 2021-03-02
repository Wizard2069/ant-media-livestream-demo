import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';

import {WebRtcService} from '../../service/web-rtc.service';
import {WebRTCAdaptor} from '../../../../assets/js/webrtc_adaptor.js';
import {VgApiService} from '@videogular/ngx-videogular/core';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, AfterViewInit, OnDestroy {
    
    private webRTCAdaptor: WebRTCAdaptor;
    
    private api: VgApiService;

    public startStream: boolean;
    
    public streamId = 'stream1';

    constructor(private webRTCService: WebRtcService) {
    }
    
    ngOnInit(): void {
        this.webRTCService.additionalConfig = {
            localVideoId: 'localVideo'
        };
    }
    
    ngAfterViewInit(): void {
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
}
