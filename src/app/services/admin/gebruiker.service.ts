import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Gebruiker } from 'src/app/interfaces/Gebruiker';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {

  constructor(private httpClient: HttpClient) { }

  getGebruikers(): Observable<Gebruiker[]> {
    // return this.httpClient.get<Gebruiker[]>(`${environment.baseApiUrl}/admin/gebruikers`);
    return timer(1000, 3000).pipe(switchMap(() => this.httpClient.get<Gebruiker[]>(`${environment.baseApiUrl}/admin/gebruikers`)));
  }

  getGebruikerById(id: number): Observable<Gebruiker> {
    // return this.httpClient.get<Gebruiker>(`${environment.baseApiUrl}/admin/gebruikers/${id}`);
    return timer(3000, 3000).pipe(switchMap(() => this.httpClient.get<Gebruiker>(`${environment.baseApiUrl}/admin/gebruikers/${id}`)));
  }


  putGebruiker(id: number, gebruiker: Gebruiker): Observable<Gebruiker> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Gebruiker>(`${environment.baseApiUrl}/admin/gebruikers/${id}`, gebruiker, { headers: headers });
  }

  deleteGebruiker(id: number): Observable<unknown> {
    return this.httpClient.delete<unknown>(`${environment.baseApiUrl}/admin/gebruikers/${id}`);
    // return timer(3000, 3000).pipe(switchMap(() => this.httpClient.delete<unknown>(`${environment.baseApiUrl}/admin/gebruikers/${id}`)));
  }
}
