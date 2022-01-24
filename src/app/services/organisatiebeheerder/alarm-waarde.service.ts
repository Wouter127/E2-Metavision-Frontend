import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlarmWaarde } from 'src/app/interfaces/Alarm-waarde';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlarmWaardeService {
 



  constructor(private httpClient: HttpClient) {}

  deleteAlarmwaarde(id: number): Observable<unknown> {
    return this.httpClient.delete<unknown>(`${environment.API_URI}/organisatiebeheerder/alarmwaardes/${id}`);
  }
  
  getAlarmwaardeById(id: number): Observable<AlarmWaarde> {
    return timer(1000).pipe(switchMap(() => this.httpClient.get<AlarmWaarde>(`${environment.API_URI}/organisatiebeheerder/alarmwaardes/${id}`)))
  }
  
  putAlarmwaarde(id: any, alarmwaarde: any): Observable<AlarmWaarde> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<AlarmWaarde>(`${environment.API_URI}/organisatiebeheerder/alarmwaardes/${id}`, alarmwaarde, {headers: headers});
  }
}
