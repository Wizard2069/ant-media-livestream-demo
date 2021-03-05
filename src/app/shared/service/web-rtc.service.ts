import {Injectable} from '@angular/core';

import {WebRTCAdaptor} from '../../../assets/js/webrtc_adaptor.js';

@Injectable()
export class WebRtcService {
    
    public pcConfig = null;

    public sdpConstraints = {
        OfferToReceiveAudio: false,
        OfferToReceiveVideo: false
    };

    public mediaConstraints = {
        video: true,
        audio: true
    };
    
    public additionalConfig = {};

    private webRTCAdaptor: WebRTCAdaptor;
    
    public handleError: () => void;
    
    public handleInit: () => void;
    
    get getWebRTCAdaptor(): WebRTCAdaptor {
        return this.webRTCAdaptor;
    }
    
    set setWebRTCAdaptor(adaptor: WebRTCAdaptor) {
        this.webRTCAdaptor = adaptor;
    }

    initWebRTCAdaptor(): void {
        this.webRTCAdaptor = new WebRTCAdaptor({
            websocket_url: 'ws://' + location.hostname + ':5080/liveStreamDemo/websocket',
            mediaConstraints: this.mediaConstraints,
            peerconnection_config: this.pcConfig,
            sdp_constraints: this.sdpConstraints,
            ...this.additionalConfig,
            callback: (info, obj) => {
                if (info === 'initialized') {
                    console.log('initialized');
                    this.handleInit();
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
                // alert(JSON.stringify(error));
                this.handleError();
            }
        });
    }
}
