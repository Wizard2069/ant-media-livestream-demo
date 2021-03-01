import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';

import {WebRTCAdaptor} from '../../../../assets/js/webrtc_adaptor.js';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit, OnDestroy {

    public startPlay: boolean;
    
    public pcConfig = null;

    public sdpConstraints = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
    };

    public mediaConstraints = {
        video: true,
        audio: true
    };

    public webRTCAdaptor: WebRTCAdaptor;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.initWebRTCAdaptor();
    }

    ngOnDestroy(): void {
    }

    initWebRTCAdaptor(): void {
        this.webRTCAdaptor = new WebRTCAdaptor({
            websocket_url: 'ws://' + location.hostname + ':5080/liveStreamDemo/websocket',
            mediaConstraints: this.mediaConstraints,
            peerconnection_config: this.pcConfig,
            sdp_constraints: this.sdpConstraints,
            remoteVideoId: 'remoteVideo',
            isPlayMode: true,
            callback: (info, obj) => {
                if (info === 'initialized') {
                    console.log('initialized');
                } else if (info === 'play_started') {
                    console.log('play started');
                } else if (info === 'play_finished') {
                    console.log('play finished');
                }
            },
            callbackError: (error) => {
                console.log('error callback: ' + JSON.stringify(error));
                alert(JSON.stringify(error));
            }
        });
    }
    
    onStartPlay(): void {
        this.webRTCAdaptor.play('stream1', null);
        this.startPlay = true;
    }
    
    onStopPlay(): void {
        this.webRTCAdaptor.stop('stream1');
        this.webRTCAdaptor.closePeerConnection('stream1');
        this.startPlay = false;
    }
}
