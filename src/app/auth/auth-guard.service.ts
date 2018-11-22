import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CanLoad, CanActivate, Route, Router,
         ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import { Account } from '../model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanLoad, CanActivate  {
    LOGIN_CHECK_URL = environment.loginCheck;

    constructor(private authService: AuthService,
                private router: Router,
                private cookieService: CookieService,
                @Inject(DOCUMENT) private document: any) {}

    canLoad(route: Route): Observable<boolean> {
        console.log('can load');
        const path = route.path;
        return this.doCheck(path);
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('can activate');
        const path = next.routeConfig.path;
        return this.doCheck(path);
    }

    private doCheck(path: string) {
        return this.authService.checkAccount().pipe(
            map((data: any) => {
                if (data.username) {
                    return true;
                } else {
                    this.redirectToCas(path);
                    return false;
                }
            })
        );
    }

    private redirectToCas(path: string) {
        const url = this.document.location.href;
        const domain = this.authService.extractHostname(url);
        const returnUrl = url.endsWith(path)?url:url+path;
        let date = new Date();
        const expires = date.getDate() + 1;
        console.log('return url',returnUrl);
        this.cookieService.delete('return-url');
        this.cookieService.set('return-url', returnUrl, expires, path, domain);
        this.document.location.href = this.LOGIN_CHECK_URL;// redirect to login URL
    }
}