import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';

import {WebRTCAdaptor} from '../../../../assets/js/webrtc_adaptor.js';
import {WebRtcService} from '../../service/web-rtc.service';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit, OnDestroy {
    
    private webRTCAdaptor: WebRTCAdaptor;

    public startPlay: boolean;
    
    public streamId = 'stream1';

    constructor(private webRTCService: WebRtcService) {
    }

    ngOnInit(): void {
        this.webRTCService.additionalConfig = {
            remoteVideoId: 'remoteVideo',
            isPlayMode: true,
        };
    }

    ngAfterViewInit(): void {
        this.webRTCService.initWebRTCAdaptor();
        this.webRTCAdaptor = this.webRTCService.getWebRTCAdaptor;
    }

    ngOnDestroy(): void {
    }
    
    onStartPlay(): void {
        this.webRTCAdaptor.play(this.streamId, null);
        this.startPlay = true;
    }
    
    onStopPlay(): void {
        this.webRTCAdaptor.stop(this.streamId);
        this.webRTCAdaptor.closePeerConnection(this.streamId);
        this.startPlay = false;
    }
}
