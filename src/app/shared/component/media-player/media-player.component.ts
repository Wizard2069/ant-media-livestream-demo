import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {VgApiService} from '@videogular/ngx-videogular/core';

@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.component.html',
    styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit {

    @Input() videoId: string;
    
    @Input() start: boolean;
    
    currentTime: number;
    
    api: VgApiService;
    
    constructor() {
    }

    ngOnInit(): void {
    }

    onPlayerReady(api: VgApiService): void {
        this.api = api;
        this.api.getDefaultMedia().subscriptions.playing.subscribe(() => {
             this.currentTime = 100;
        });
    }
}
