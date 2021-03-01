import {NgModule} from '@angular/core';
import {VideoComponent} from './component/video/video.component';
import {CommonModule} from '@angular/common';
import {PlayerComponent} from './component/player/player.component';

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
    ]
})
export class SharedModule {
}
