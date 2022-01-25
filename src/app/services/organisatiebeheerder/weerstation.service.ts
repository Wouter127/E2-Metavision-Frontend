import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeerstationService {

  constructor(private httpClient: HttpClient) {

  }

  activeerWeerstation(uniekeCode: string): Observable<Weerstation> {
    return this.httpClient.get<Weerstation>(environment.API_URI + "/organisatiebeheerder/weerstations/activeer/" + uniekeCode);
  } 

  getWaardesByWeerstationId(id: number): Observable<Weerstation> {
    return this.httpClient.get<Weerstation>(environment.API_URI + "/organisatiebeheerder/weerstations/" + id);
  }
}
