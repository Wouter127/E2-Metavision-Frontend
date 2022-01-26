import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthWeerstationService {

  constructor(private httpClient:HttpClient) { }

  
  getDataBetweenDates(
    weerstation_id: number,
    begin: string,
    eind: string
  ): Observable<Weerstation> {
    let parameters: string = '';
    let parameterCount = 0;

    if (begin){
      if (parameterCount === 0) {
        parameters += '?begin='+begin;
        parameterCount++;
      }
      else {
        parameters += '&begin='+begin;
        parameterCount++;
      }
    }
    if (eind){
      if (parameterCount === 0) {
        parameters += '?eind='+eind;
        parameterCount++;
      }
      else {
        parameters += '&eind='+eind;
        parameterCount++;
      }
    }
    return this.httpClient.get<Weerstation>(`${environment.API_URI}/auth/weerstations/${weerstation_id}/metingen${parameters}`);
  
  }

  getLaatsteMeting(weerstation_id: number): Observable<any> {
    return this.httpClient.get<any[]>(`${environment.API_URI}/auth/meting/${weerstation_id}/laatsteMeting`);
  }

  getWeerstationWithMetingen(weerstation_id:number, begin?:string, eind?:string):Observable<Weerstation> {
      let parameters: string = '';
      let parameterCount = 0;
    if (begin){
      if (parameterCount === 0) {
        parameters += '?begin='+begin;
        parameterCount++;
      }
      else {
        parameters += '&begin='+begin;
        parameterCount++;
      }
    }
    if (eind){
      if (parameterCount === 0) {
        parameters += '?eind='+eind;
        parameterCount++;
      }
      else {
        parameters += '&eind='+eind;
        parameterCount++;
      }
    }
    return this.httpClient.get<Weerstation>(`${environment.API_URI}/auth/weerstations/${weerstation_id}/metingen${parameters}`);
  }
}
