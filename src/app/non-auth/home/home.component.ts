import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/security/auth-state.service';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private authStateService: AuthStateService) { }

  ngOnInit(): void {
    this.authStateService.gebruikerAuthState.subscribe(
      isLoggedIn => {
        if (isLoggedIn) {
          this.isLoggedIn = true;
        }
      }
    );
  }

}
