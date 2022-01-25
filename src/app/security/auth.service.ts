import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gebruiker } from '../interfaces/Gebruiker';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private toast: HotToastService, private router: Router) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }

  getGebruiker(): Observable<Gebruiker> {
    return this.httpClient.get<any>(`${environment.API_URI}/auth/account`);
  }

  login(email: string, wachtwoord: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<any>(`${environment.API_URI}/login`, { email, wachtwoord }, { headers: headers });
  }

  logout(): void {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    this.httpClient.post<any>(`${environment.API_URI}/auth/logout`, {}, { headers: headers }).pipe(
      this.toast.observe({
        loading: { content: 'Uitloggen...', position: 'bottom-right' },
        success: { content: 'U bent succesvol uitgelogd!', position: 'bottom-right', dismissible: true },
        error: { content: 'Er ging iets mis.', position: 'bottom-right', dismissible: true },
      })
    ).subscribe(
      result => {
        this.deleteToken();
        this.router.navigate(['login']);
      }
    );
  }
}
