import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sensor } from 'src/app/interfaces/Sensor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private httpClient: HttpClient) { }

  getSensoren(): Observable<Sensor[]> {
    return this.httpClient.get<Sensor[]>(`${environment.API_URI}/organisatiebeheerder/sensoren`);
  }

  getSensorById(id: number): Observable<Sensor> {
    return this.httpClient.get<Sensor>(environment.API_URI + "/admin/sensoren/" + id);
  }

  putSensor(id: number, sensor: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<any>(environment.API_URI + "/admin/sensoren/" + id, sensor, { headers: headers });
  }
}
