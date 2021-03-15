import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {CoreModule} from './core/core.module';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './layout/header/header.component';
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';
import {SharedModule} from './shared/shared.module';
import {DataModule} from './data/data.module';

const initializeKeycloak = (keycloak: KeycloakService) => {
    return () =>
        keycloak.init({
            config: {
                url: 'http://localhost:8090/auth',
                realm: 'demo',
                clientId: 'livestream-demo',
            },
            initOptions: {
                onLoad: 'check-sso',
                silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
            },
            bearerExcludedUrls: ['/assets']
        });
};

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ContentLayoutComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        CoreModule,
        DataModule,
        KeycloakAngularModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService],
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
