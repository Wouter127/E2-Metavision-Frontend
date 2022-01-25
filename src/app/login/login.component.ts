import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../security/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  wachtwoord: string = '';

  constructor(private authService: AuthService, private toast: HotToastService) { 
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.login(this.email, this.wachtwoord).pipe(
      this.toast.observe({
        loading: { content: 'Inloggen...', position: 'bottom-right' },
        success: { content: (result: any) => `Welkom ${result.gebruiker.voornaam}!`, position: 'bottom-right', dismissible: true },
        error: { content: 'Er ging iets mis.', position: 'bottom-right', dismissible: true },
      })
    ).subscribe(
      result => {
        localStorage.setItem('token', result.token);
      }
    );
  }

}
