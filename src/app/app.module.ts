import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MdbModule} from 'mdb-angular-ui-kit';

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
        MdbModule,
        AppRoutingModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
