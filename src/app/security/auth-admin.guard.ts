import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthStateService } from './auth-state.service';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate, CanActivateChild {

  constructor(private tokenService: TokenService, private router: Router, private authService: AuthService, private authStateService: AuthStateService) { }

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
        return true;
    } else {
      return this.router.parseUrl('/login');
    }
    // return this.isLoggedIn();
  }


  // isLoggedIn() {
  //   if (this.tokenService.isLoggedIn()) {
  //     return this.getGebruiker()
  //   } else {
  //     return this.router.parseUrl('/login');
  //   }
  // }

  // getGebruiker() {
  //   this.authService.getGebruiker().subscribe(
  //     gebruiker => {
  //       if (gebruiker.isAdmin) 
  //       {
  //         return true;
  //       } 
  //       else 
  //       {
  //         return this.router.parseUrl('/403');
  //       }
  //     });
  // }
}
