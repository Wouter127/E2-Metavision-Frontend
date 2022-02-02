import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Gebruiker } from '../interfaces/Gebruiker';
import { AuthStateService } from '../security/auth-state.service';
import { AuthService } from '../security/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
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
}
