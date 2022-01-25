import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // All HTTP requests are going to go through this method
        const token = this.authService.getToken();
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
}