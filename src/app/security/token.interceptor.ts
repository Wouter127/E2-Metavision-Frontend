import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Add Bearer token only to routes that contain the URL of the api
        if (req.url.includes(environment.API_URI)) {
            const token = this.tokenService.getToken();
            if (token) {
                req = req.clone({
                    setHeaders: {
                        Authorization: "Bearer " + token
                    }
                });
            }

            return next.handle(req).pipe(
                catchError(err => {
                    if (err.status === 401) {
                        this.router.navigate(['login']);
                    }
                    return throwError(err);
                })
            );
        }
        else {
            return next.handle(req);
        }
    }
}