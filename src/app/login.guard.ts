import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateService } from './security/auth-state.service';
import { AuthService } from './security/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authStateService: AuthStateService, private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return new Observable<boolean | UrlTree>(obs => {
      this.authStateService.gebruikerAuthState.subscribe(
        isLoggedIn => {
          if (isLoggedIn) {
            obs.next(this.router.parseUrl('/auth/dashboard'));
          } else {
            obs.next(true);
          }
        }
      )
    });
  }
}
