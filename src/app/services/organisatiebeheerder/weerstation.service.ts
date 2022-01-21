import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weerstation } from 'src/app/interfaces/Weerstation';

@Injectable({
  providedIn: 'root'
})
export class WeerstationService {

  constructor(private httpClient: HttpClient) {

  }

  activeerWeerstation(uniekeCode: string): Observable<Weerstation> {
    return this.httpClient.get<Weerstation>("http://127.0.0.1:8000/api/organisatiebeheerder/weerstations/activeer/" + uniekeCode);
}
}
