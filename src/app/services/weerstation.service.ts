   
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { environment } from 'src/environments/environment';
import { Organisatie } from 'src/app/interfaces/Organisatie';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class WeerstationService {

  constructor(private httpClient: HttpClient) { }

  genereerNieuweCode(id: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Weerstation>(environment.API_URI + "/admin/weerstations/nieuwecode/" + id, {headers: headers});
  }

  putWeerstation(id: number, weerstation: Weerstation) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Weerstation>(environment.API_URI + "/admin/weerstations/" + id, weerstation, {headers: headers});
  }

  deleteWeerstation(id: number): Observable<Weerstation> {
    return this.httpClient.delete<Weerstation>(environment.API_URI + "/admin/weerstations/" + id);
  }

  getWeerstations(organisatieId?: string): Observable<Weerstation[]> {
    let parameters: string = '';
    let parameterCount = 0;
    if (organisatieId) {
      if (parameterCount === 0) {
        parameters += '?organisatieId='+organisatieId;
        parameterCount++;
      }
      else {
        parameters += '&organisatieId=' + organisatieId;
        parameterCount++;
      }
    }

    return this.httpClient.get<Weerstation[]>(environment.API_URI + "/admin/weerstations" + parameters);
  }

  getWeerstationById(id: number): Observable<Weerstation> {
    return this.httpClient.get<Weerstation>(environment.API_URI + "/admin/weerstations/" + id);
  }


  postWeerstation(gsmNummer: string): Observable<Weerstation> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Weerstation>(environment.API_URI + "/admin/weerstations", { gsmNummer }, {headers: headers});
  }

  getLaatsteMeting(weerstation_id: number): Observable<any> {
    return this.httpClient.get<any[]>(`${environment.API_URI}/auth/meting/${weerstation_id}/laatsteMeting`);
  }

  getWeerstationWithMetingen(weerstation_id: number, begin?: string, eind?: string): Observable<Weerstation> {
    let parameters: string = '';
    let parameterCount = 0;
    if (begin) {
      if (parameterCount === 0) {
        parameters += '?begin=' + begin;
        parameterCount++;
      }
      else {
        parameters += '&begin=' + begin;
        parameterCount++;
      }
    }
    if (eind) {
      if (parameterCount === 0) {
        parameters += '?eind=' + eind;
        parameterCount++;
      }
      else {
        parameters += '&eind=' + eind;
        parameterCount++;
      }
    }
    return this.httpClient.get<Weerstation>(`${environment.API_URI}/weerstations/${weerstation_id}/metingen${parameters}`);
  }


  activeerWeerstation(uniekeCode: string): Observable<Weerstation> {
    return this.httpClient.get<Weerstation>(environment.API_URI + "/organisatiebeheerder/weerstations/activeer/" + uniekeCode);
  } 

  getWaardesByWeerstationId(id: number): Observable<Weerstation> {
    return this.httpClient.get<Weerstation>(environment.API_URI + "/organisatiebeheerder/weerstations/" + id);
  }

  getDataBetweenDates(
    weerstation_id: number,
    begin?: string,
    eind?: string
  ): Observable<Weerstation> {
    let parameters: string = '';
    let parameterCount = 0;

    if (begin) {
      if (parameterCount === 0) {
        parameters += '?begin=' + begin;
        parameterCount++;
      }
      else {
        parameters += '&begin=' + begin;
        parameterCount++;
      }
    }
    if (eind) {
      if (parameterCount === 0) {
        parameters += '?eind=' + eind;
        parameterCount++;
      }
      else {
        parameters += '&eind=' + eind;
        parameterCount++;
      }
    }
    console.log(`${environment.API_URI}/weerstations/${weerstation_id}/metingen${parameters}`);
    
    return this.httpClient.get<Weerstation>(`${environment.API_URI}/weerstations/${weerstation_id}/metingen${parameters}`);

  }

  putWeerstationOrganisatieBeheerder(id: number, weerstation: Weerstation) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Weerstation>(environment.API_URI + "/organisatiebeheerder/weerstations/" + id, weerstation, { headers: headers });
  }

  getPubliekeWeerstations(organisatieId?: string): Observable<Weerstation[]> {
    let parameters: string = '';
    let parameterCount = 0;
    if (organisatieId) {
      if (parameterCount === 0) {
        parameters += '?organisatieId='+organisatieId;
        parameterCount++;
      }
      else {
        parameters += '&organisatieId=' + organisatieId;
        parameterCount++;
      }
    }

    return this.httpClient.get<Weerstation[]>(environment.API_URI + "/publiekeweerstations" + parameters);
  }

}