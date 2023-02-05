// intercepts http requests and adds the authorization header

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private readonly keycloak: KeycloakService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.keycloak.isLoggedIn()) {
            return next.handle(request);
        }

        var token = localStorage.getItem('token');
        request = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(request);
    }
}


