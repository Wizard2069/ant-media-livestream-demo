import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdbModule} from 'mdb-angular-ui-kit';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import {FormsModule} from '@angular/forms';

import {VideoComponent} from './component/video/video.component';
import {PlayerComponent} from './component/player/player.component';
import {WebRtcService} from './service/web-rtc.service';
import {MediaPlayerComponent} from './component/media-player/media-player.component';
import {ChatBoxComponent} from './component/chat-box/chat-box.component';

@NgModule({
    declarations: [
        VideoComponent,
        PlayerComponent,
        MediaPlayerComponent,
        ChatBoxComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MdbModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule
    ],
    exports: [
        CommonModule,
        VideoComponent,
        PlayerComponent
    ],
    providers: [
        WebRtcService
    ]
})
export class SharedModule {
}
