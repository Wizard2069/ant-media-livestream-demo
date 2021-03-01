import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';

import {WebRTCAdaptor} from '../../../../assets/js/webrtc_adaptor.js';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, AfterViewInit, OnDestroy {

    public startStream: boolean;
    
    public pcConfig = null;
    
    public sdpConstraints = {
        OfferToReceiveAudio: false,
        OfferToReceiveVideo: false
    };
    
    public mediaConstraints = {
        video: true,
        audio: true
    };
    
    public webRTCAdaptor: WebRTCAdaptor;

    constructor() {
    }
    
    ngOnInit(): void {
        console.log('init');
    }
    
    ngAfterViewInit(): void {
        console.log('after view init');
        this.initWebRTCAdaptor();
    }
    
    ngOnDestroy(): void {
        console.log('destroy');
        this.webRTCAdaptor.closeStream();
        this.webRTCAdaptor.closeWebSocket();
    }

    initWebRTCAdaptor(): void {
        this.webRTCAdaptor = new WebRTCAdaptor({
            websocket_url: 'ws://' + location.hostname + ':5080/liveStreamDemo/websocket',
            mediaConstraints: this.mediaConstraints,
            peerconnection_config: this.pcConfig,
            sdp_constraints: this.sdpConstraints,
            localVideoId: 'localVideo',
            callback: (info, obj) => {
                if (info === 'initialized') {
                    console.log('initialized');
                } else if (info === 'publish_started') {
                    console.log('publish started');
                } else if (info === 'publish_finished') {
                    console.log('publish finished');
                } else if (info === 'screen_share_extension_available') {
                    console.log('screen share extension available');
                } else if (info === 'screen_share_stopped') {
                    console.log('screen share stopped');
                }
            },
            callbackError: (error) => {
                console.log('error callback: ' + JSON.stringify(error));
                alert(JSON.stringify(error));
            }
        });
    }
    
    onStartStream(): void {
        this.webRTCAdaptor.publish('stream1', null);
        this.startStream = true;
    }
    
    onStopStream(): void {
        this.webRTCAdaptor.stop('stream1');
        this.webRTCAdaptor.closePeerConnection('stream1');
        this.startStream = false;
    }
}
