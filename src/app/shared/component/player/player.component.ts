import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';

import {WebRTCAdaptor} from '../../../../assets/js/webrtc_adaptor.js';
import {WebRtcService} from '../../service/web-rtc.service';
import {MessagePayload} from '../../../types';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit, OnDestroy {
    
    public webRTCAdaptor: WebRTCAdaptor;
    
    public streamId = 'stream1';
    
    public data: MessagePayload;
    
    public hasError: boolean;
    
    public errInterval: Subscription;

    constructor(private webRTCService: WebRtcService) {
    }

    ngOnInit(): void {
        this.webRTCService.additionalConfig = {
            remoteVideoId: 'remoteVideo',
            isPlayMode: true,
        };
    }

    ngAfterViewInit(): void {
        this.webRTCService.handleData = (data) => {
            this.data = data;
        };
        this.webRTCService.handleInit = () => {
            this.webRTCAdaptor.play(this.streamId, null);
        };
        this.webRTCService.handleError = () => {
            this.hasError = true;
        };
        this.errInterval = interval(4000).subscribe(() => {
            if (this.hasError) {
                console.log('Trying to reconnect...');
                this.webRTCAdaptor.play(this.streamId, null);
                this.hasError = false;
            } else {
                console.log('All good');
            }
        });
        this.webRTCService.initWebRTCAdaptor();
        setTimeout(() => {
            this.webRTCAdaptor = this.webRTCService.getWebRTCAdaptor;
        });
    }

    ngOnDestroy(): void {
        this.errInterval.unsubscribe();
        this.webRTCAdaptor.stop(this.streamId);
        this.webRTCAdaptor.closePeerConnection(this.streamId);
        this.webRTCAdaptor.closeWebSocket();
    }
    
    onPlayStream(isPlay): void {
        if (isPlay) {
            this.webRTCAdaptor.play(this.streamId, null);
        } else {
            this.webRTCAdaptor.stop(this.streamId);
        }
    }
}
