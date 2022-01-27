import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthOrganisatiebeheerderGuard implements CanActivate, CanActivateChild {

  constructor(private tokenService: TokenService, private router: Router, private authService: AuthService) {}

  gebruiker: any = []

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    return this.checkRoute();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    return this.checkRoute();
  }

  checkRoute(): boolean | UrlTree {


    if (this.tokenService.isLoggedIn()) {
      
      this.authService.getGebruiker().subscribe(result => {
        this.gebruiker = result;      
      });

      if (this.gebruiker.isOrganisatieBeheerder === 1 || this.gebruiker.isAdmin === 1) {
        return true;
      } else {
        return this.router.parseUrl('/403');
      }
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
