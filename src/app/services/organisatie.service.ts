import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organisatie } from 'src/app/interfaces/Organisatie';

@Injectable({
  providedIn: 'root'
})
export class OrganisatieService {

  constructor(private httpClient: HttpClient) {}

  getOrganisaties(): Observable<Organisatie[]> {
    return this.httpClient.get<Organisatie[]>(`${environment.API_URI}/admin/organisaties`);
  }

  getOrganisatieWithWeerstations(organisatieId: number): Observable<Organisatie> {
    
    return this.httpClient.get<Organisatie>(environment.API_URI + "/organisatiebeheerder/organisaties/" + organisatieId);
  }

  getAllOrganisatiesWithWeerstations(): Observable<Organisatie[]> {
    
    return this.httpClient.get<Organisatie[]>(environment.API_URI + "/admin/organisaties/weerstations/");
  }

  deleteOrganisatie(organisatieId: number): Observable<Organisatie> {
    return this.httpClient.delete<Organisatie>(environment.API_URI + "/admin/organisaties/" + organisatieId);
  }

  getOrganisatieById(id: number): Observable<Organisatie> {
    return this.httpClient.get<Organisatie>(environment.API_URI + "/admin/organisaties/" + id);
  }

  putOrganisatie(id: number, organisatie: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<any>(environment.API_URI + "/admin/organisaties/" + id, organisatie, {headers: headers});
  }
}
