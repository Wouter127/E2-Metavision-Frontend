import { Injectable } from '@angular/core';
import { Weerstation } from 'src/app/interfaces/Weerstation';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeerstationService {

  constructor(private httpClient: HttpClient) { }

  getWeerstations(): Observable<Weerstation[]> {
    return this.httpClient.get<Weerstation[]>("http://127.0.0.1:8000/api/admin/weerstations");
  }

  getWeerstationById(id: number): Observable<Weerstation> {
    return this.httpClient.get<Weerstation>("http://127.0.0.1:8000/api/admin/weerstations/" + id);
  }


  postWeerstation(weerstation: Weerstation): Observable<Weerstation> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Weerstation>("http://127.0.0.1:8000/api/admin/weerstations", weerstation, {headers: headers});

  }

  deleteWeerstation(id: number): Observable<Weerstation> {
    return this.httpClient.delete<Weerstation>("http://127.0.0.1:8000/api/admin/weerstations/" + id);
}
}
