import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Gebruiker } from '../interfaces/Gebruiker';
import { Organisatie } from '../interfaces/Organisatie';

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {

  constructor(private httpClient: HttpClient) { }

  checkToken(user_id: number, vervolledig_token: string): Observable<Gebruiker> {
    return timer(3000).pipe(switchMap(() => this.httpClient.get<Gebruiker>(`${environment.API_URI}/vervolledig/${user_id}/${vervolledig_token}`)));
  }

  vervolledigOrganisatieBeheerder(user_id: number, vervolledig_token: string, gebruiker: Gebruiker, organisatie: Organisatie, wachtwoord_confirmation: string): Observable<Gebruiker> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    let gebruikerSend: any = gebruiker;
    gebruikerSend.password_confirmation = wachtwoord_confirmation;

    return this.httpClient.put<Gebruiker>(`${environment.API_URI}/vervolledig/${user_id}/${vervolledig_token}`, { gebruiker, organisatie }, { headers: headers });
  }

  vervolledigOrganisatieGebruiker(user_id: number, vervolledig_token: string, gebruiker: Gebruiker, organisatie: Organisatie, wachtwoord_confirmation: string): Observable<Gebruiker> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    let gebruikerSend: any = gebruiker;
    gebruikerSend.password_confirmation = wachtwoord_confirmation;

    return this.httpClient.put<Gebruiker>(`${environment.API_URI}/vervolledigGebruiker/${user_id}/${vervolledig_token}`, { gebruiker, organisatie }, { headers: headers });
  }

  getGebruikers(): Observable<Gebruiker[]> {
    // return this.httpClient.get<Gebruiker[]>(`${environment.API_URI}/admin/gebruikers`);
    return timer(1000).pipe(switchMap(() => this.httpClient.get<Gebruiker[]>(`${environment.API_URI}/admin/gebruikers`)));
  }

  getGebruikerById(id: number): Observable<Gebruiker> {
    // return this.httpClient.get<Gebruiker>(`${environment.API_URI}/admin/gebruikers/${id}`);
    return timer(1000).pipe(switchMap(() => this.httpClient.get<Gebruiker>(`${environment.API_URI}/admin/gebruikers/${id}`)));
  }

  postGebruikerOrganisatieBeheerder(email: string): Observable<Gebruiker> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Gebruiker>(`${environment.API_URI}/admin/gebruikers`, { email }, { headers: headers });
  }

  putGebruiker(id: number, gebruiker: Gebruiker): Observable<Gebruiker> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Gebruiker>(`${environment.API_URI}/admin/gebruikers/${id}`, gebruiker, { headers: headers });
  }

  deleteGebruiker(id: number): Observable<unknown> {
    return this.httpClient.delete<unknown>(`${environment.API_URI}/admin/gebruikers/${id}`);
    // return timer(3000).pipe(switchMap(() => this.httpClient.delete<unknown>(`${environment.API_URI}/admin/gebruikers/${id}`)));
  }

  deleteGebruikerAlsOrganistieBeheerder(id: number): Observable<unknown> {
    return this.httpClient.delete<unknown>(`${environment.API_URI}/organisatiebeheerder/gebruikers/${id}`);
  }
  putGebruikerAlsOrganisatieBeheerder(id: number, gebruiker: Gebruiker): Observable<Gebruiker> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Gebruiker>(`${environment.API_URI}/organisatiebeheerder/gebruikers/${id}`, gebruiker, { headers: headers });
  }
  getGebruikerByIdAlsOrganisatieBeheerder(id: number): Observable<Gebruiker> {
    // return this.httpClient.get<Gebruiker>(`${environment.API_URI}/admin/gebruikers/${id}`);
    return timer(1000).pipe(switchMap(() => this.httpClient.get<Gebruiker>(`${environment.API_URI}/organisatiebeheerder/gebruikers/${id}`)));
  }
  postOrganisatieGebruiker(email: string): Observable<Gebruiker> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Gebruiker>(`${environment.API_URI}/organisatiebeheerder/gebruikers`, { email }, { headers: headers });
  }
}
