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
    gebruikerSend.wachtwoord_confirmation = wachtwoord_confirmation;

    return this.httpClient.put<Gebruiker>(`${environment.API_URI}/vervolledig/${user_id}/${vervolledig_token}`, { gebruiker, organisatie }, { headers: headers });
  }
}
