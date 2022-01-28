import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { AuthStateService } from './security/auth-state.service';
import { AuthService } from './security/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrganisatiebeheerderAuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router, private toast: HotToastService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
      return new Observable<boolean | UrlTree>(obs => {
        this.authService.getGebruiker().subscribe(
          gebruiker => {
            if (gebruiker.isOrganisatieBeheerder || gebruiker.isAdmin) {
              if (gebruiker.organisatieId) {
                obs.next(true);
              }
              else {
                obs.next(this.router.parseUrl('/'));
                this.toast.error("U maakt geen deel uit van een organisatie en kunt deze pagina dus niet weergeven.", { position: 'bottom-right', dismissible: true, autoClose: false });
              }
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
            if (gebruiker.isOrganisatieBeheerder || gebruiker.isAdmin) {
              if (gebruiker.organisatieId) {
                obs.next(true);
              }
              else {
                obs.next(this.router.parseUrl('/'));
                this.toast.error("U maakt geen deel uit van een organisatie en kunt deze pagina dus niet weergeven.", { position: 'bottom-right', dismissible: true, autoClose: false });
              }
            }
            else {
              obs.next(this.router.parseUrl('/login'));
            }
          }
        )
      });
  }
  
}
