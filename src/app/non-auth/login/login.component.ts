import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../../security/auth.service';
import { AuthStateService } from '../../security/auth-state.service';
import { TokenService } from '../../security/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private tokenService: TokenService, private authStateService: AuthStateService, private toast: HotToastService, private router: Router) { 
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
            console.log(e);
            
            let checkHtml = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/.test(e.error);
            
            if (checkHtml || e.status === 500) {
              let msg = '<ul>';
              msg += `<li><b>Er ging iets mis!</b></li>`;
              msg += `<li>Probeer opnieuw of contacteer ons.</li>`;
              msg += '</ul>';

              return msg;
            }
            else {
              let msg = '<ul>';
              msg += `<li><b>Er ging iets mis!</b></li>`;
              for (let key in e.error) {
                msg += `<li>${e.error[key]}</li>`;
              }
              msg += '</ul>';

              return msg;
            }
          }, position: 'bottom-right', dismissible: true, duration: 5000
        },
      })
    ).subscribe(
      result => {
        this.tokenService.handleData(result.access_token);
        this.authStateService.setAuthState(true);
        this.router.navigate(['auth/dashboard']);
      }
    );
  }
}
