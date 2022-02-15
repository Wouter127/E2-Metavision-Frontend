import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vraag } from '../interfaces/Vraag';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(private httpClient: HttpClient) { }

  putVraag(id: number, vraag: Vraag) {
    let headers = new HttpHeaders(); 
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Vraag>(environment.API_URI + "/admin/vragen/" + id, vraag, {headers: headers});   
  }

  deleteVraag(id: number): Observable<Vraag> {
    return this.httpClient.delete<Vraag>(environment.API_URI + "/admin/vragen/" + id);
  }

  getVragen(): Observable<Vraag[]> {
    return this.httpClient.get<Vraag[]>(environment.API_URI + "/vragen")
  }

  getVraagById(id: number): Observable<Vraag> {
    return this.httpClient.get<Vraag>(environment.API_URI + "/vragen/" + id);
  }

  postVraag(vraag: Vraag): Observable<Vraag> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Vraag>(environment.API_URI + "/admin/vragen", vraag,{headers: headers});
  }
}
