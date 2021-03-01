import {NgModule} from '@angular/core';
import {VideoComponent} from './component/video/video.component';
import {CommonModule} from '@angular/common';
import {PlayerComponent} from './component/player/player.component';
import {WebRtcService} from './service/web-rtc.service';

@NgModule({
    declarations: [
        VideoComponent,
        PlayerComponent
    ],
    imports: [
        CommonModule
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
