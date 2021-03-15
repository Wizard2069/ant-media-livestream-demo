import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {MessageHistoryService} from './service/message-history.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    exports: [],
    providers: [
        MessageHistoryService
    ]
})
export class DataModule {
}
