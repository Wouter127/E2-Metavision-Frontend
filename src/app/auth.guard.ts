import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './security/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
      return new Observable<boolean | UrlTree>(obs => {
        this.authService.getGebruiker().subscribe(
          gebruiker => {
            if (gebruiker) {
              obs.next(true);
            }
            else {
              obs.next(this.router.parseUrl('/login'));
            }
          }
        )
      });
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
      return new Observable<boolean | UrlTree>(obs => {
        this.authService.getGebruiker().subscribe(
          gebruiker => {
            if (gebruiker) {
              obs.next(true);
            }
            else {
              obs.next(this.router.parseUrl('/login'));
            }
          }
        )
      });
  }
  
}
