import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './layout/header/header.component';
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';
import {SharedModule} from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ContentLayoutComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
