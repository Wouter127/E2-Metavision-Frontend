import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sensor } from 'src/app/interfaces/Sensor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private httpClient: HttpClient) { }

  getSensoren(): Observable<Sensor> {
    return this.httpClient.get<Sensor>(`${environment.API_URI}/organisatiebeheerder/sensoren`);
  }
}
