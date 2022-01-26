import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SchakelWaarde } from 'src/app/interfaces/Schakel-waarde';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchakelWaardeService {

  constructor(private httpClient: HttpClient) { }

  getSchakelwaardeById(id: number): Observable<SchakelWaarde> {
    return this.httpClient.get<SchakelWaarde>(`${environment.API_URI}/organisatiebeheerder/schakelwaardes/${id}`);
  }

  postSchakelwaarde(schakelwaarde: any): Observable<SchakelWaarde> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<SchakelWaarde>(`${environment.API_URI}/organisatiebeheerder/schakelwaardes`, schakelwaarde, { headers: headers });
  }

  putSchakelwaarde(id: any, schakelwaarde: any): Observable<SchakelWaarde> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<SchakelWaarde>(`${environment.API_URI}/organisatiebeheerder/schakelwaardes/${id}`, schakelwaarde, { headers: headers });
  }

  deleteSchakelwaarde(id: number): Observable<unknown> {
    return this.httpClient.delete<unknown>(`${environment.API_URI}/organisatiebeheerder/schakelwaardes/${id}`);
  }
}
