import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { RouterOutlet } from '@angular/router';
import { Gebruiker } from './interfaces/Gebruiker';
import { slider} from './route-animations'
import { AuthStateService } from './security/auth-state.service';
import { AuthService } from './security/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slider,
  ]
})
export class AppComponent {
  title = 'E2-Metavision-Frontend';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  @ViewChild(MatMenuTrigger)
  trigger!: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }
  
  isLoggedIn: boolean = false;
  gebruiker!: Gebruiker | undefined;

  constructor(private authService: AuthService, private authStateService: AuthStateService) {}

  ngOnInit(): void {
    this.authStateService.gebruikerAuthState.subscribe(
      value => {
        this.isLoggedIn = value;

        if (value) {
          this.authService.getGebruiker().subscribe(
            gebruiker => {
              this.gebruiker = gebruiker;
              console.log(gebruiker);
            }
          );
        }
        else {
          this.gebruiker = undefined;
        }
      }
    );
  }

  onLogout(): void {
    this.authService.logout();
  }

  clicks() {
    console.log("click!");
    
  }
}
