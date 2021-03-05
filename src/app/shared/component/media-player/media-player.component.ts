import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VgApiService} from '@videogular/ngx-videogular/core';

@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.component.html',
    styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit {
    
    @Input() videoId: string;

    @Input() playMode: boolean;
    
    @Input() start: boolean;

    @Output() mute = new EventEmitter<boolean>();
    
    @Output() stopStream = new EventEmitter<boolean>();
    
    public api: VgApiService;

    public isMute = false;
    
    public currentTime: number;

    public showSlider: boolean;

    constructor() {
    }

    ngOnInit(): void {
    }

    onPlayerReady(api: VgApiService): void {
        console.log('ready');
        this.api = api;
        this.api.getDefaultMedia().subscriptions.playing.subscribe(() => {
            this.currentTime = 100;
        });
        this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
            this.api.getDefaultMedia().currentTime = 0;
        });
    }

    onClick(e): void {
        console.log(e);
    }
    
    onClickMute(): void {
        this.isMute = true;
        this.mute.emit(true);
    }
    
    onClickUnmute(): void {
        this.isMute = false;
        this.mute.emit(false);
    }
    
    onClickStopStream(): void {
        this.stopStream.emit(false);
    }
}
