import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StreamComponent} from './page/stream.component';
import {WatchComponent} from './page/watch/watch.component';

const routes: Routes = [
    {
        path: '',
        component: StreamComponent
    },
    {
        path: 'watch',
        component: WatchComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class StreamRoutingModule {
}
