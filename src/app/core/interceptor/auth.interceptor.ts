import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KeycloakService} from 'keycloak-angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private keycloak: KeycloakService) {
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.keycloak.getKeycloakInstance().token;
        const authReq = req.clone({
            headers: req.headers.set('Authorization', token)
        });
        
        return next.handle(authReq);
    }
    
}
