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


  putWeerstation(id: number, weerstation: Weerstation) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Weerstation>(environment.API_URI + "/admin/weerstations/" + id, weerstation, {headers: headers});
  }

  deleteWeerstation(id: number): Observable<Weerstation> {
    return this.httpClient.delete<Weerstation>(environment.API_URI + "/admin/weerstations/" + id);
}

getWeerstations(): Observable<Weerstation[]> {
    return this.httpClient.get<Weerstation[]>(environment.API_URI + "/admin/weerstations");
  }

  getWeerstationsZonderOrganisaties(): Observable<Weerstation[]> {
    return this.httpClient.get<Weerstation[]>(environment.API_URI + "/admin/weerstations?organisatieId=null");
  }

  getWeerstationById(id: number): Observable<Weerstation> {
    return this.httpClient.get<Weerstation>(environment.API_URI + "/admin/weerstations/" + id);
  }


  postWeerstation(weerstation: Weerstation): Observable<Weerstation> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Weerstation>(environment.API_URI + "/admin/weerstations", weerstation, {headers: headers});
  }


}