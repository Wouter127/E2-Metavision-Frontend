import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gebruiker } from '../interfaces/Gebruiker';
import { AuthService } from '../security/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  gebruiker!: Gebruiker;
  gebruiker$: Subscription = new Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.gebruiker$ = this.authService.getGebruiker().subscribe(
      result => {
        this.gebruiker = result;
      }
    );
  }

  onLogout(): void {
    this.authService.logout();
  }

}
