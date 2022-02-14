import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Email } from '../interfaces/Email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }

  getEmails(): Observable<Email[]> {
    return this.httpClient.get<Email[]>(`${environment.API_URI}/admin/emails`);
  }

  getEmailById(id: number): Observable<Email> {
    return this.httpClient.get<Email>(environment.API_URI + "/admin/emails/" + id);
  }

  putEmail(id: number, email: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<any>(environment.API_URI + "/admin/emails/" + id, email, { headers: headers });
  }

  getEmailConfig(): Observable<any> {
    return this.httpClient.get<Email[]>(`${environment.API_URI}/admin/emailconfig`);
  }

  putEmailConfig(id: number, emailConfig: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<any>(environment.API_URI + "/admin/emailconfig/" + id, emailConfig, { headers: headers });
  }
}
