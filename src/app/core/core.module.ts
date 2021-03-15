import {NgModule} from '@angular/core';

import {AuthGuard} from './guard/auth.guard';
import {AuthInterceptor} from './interceptor/auth.interceptor';

@NgModule({
    imports: [],
    providers: [
        AuthGuard,
        AuthInterceptor
    ]
})
export class CoreModule {
}
