import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthStateService } from '../security/auth-state.service';
import { AuthService } from '../security/auth.service';
import { TokenService } from '../security/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private tokenService: TokenService, private authStateService: AuthStateService, private toast: HotToastService) { 
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.login(this.email, this.password).pipe(
      this.toast.observe({
        loading: { content: 'Inloggen...', position: 'bottom-right' },
        success: { content: (result: any) => `Welkom ${result.gebruiker.voornaam}!`, position: 'bottom-right', dismissible: true },
        error: {
          content: (e) => {
            let msg = '<ul>';
            msg += `<li><b>Er ging iets mis!</b></li>`;
            for (let key in e.error) {
              msg += `<li>${e.error[key]}</li>`;
            }
            msg += '</ul>';

            return msg;
          }, position: 'bottom-right', dismissible: true, duration: 5000
        },
      })
    ).subscribe(
      result => {
        this.tokenService.handleData(result.access_token);
        this.authStateService.setAuthState(true);
      }
    );
  }
}
