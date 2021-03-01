import {NgModule} from '@angular/core';
import {StreamComponent} from './page/stream.component';
import {StreamRoutingModule} from './stream-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {WatchComponent} from './page/watch/watch.component';

@NgModule({
    declarations: [
        StreamComponent,
        WatchComponent
    ],
    imports: [
        StreamRoutingModule,
        SharedModule
    ]
})
export class StreamModule {
}
