import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeerstationService {

  constructor(private httpClient:HttpClient) { }
  
  getWeerstationWithMetingen(weerstation_id:number):Observable<Weerstation> {
      return this.httpClient.get<Weerstation>(`${environment.API_URI}/auth/weerstations/${weerstation_id}/metingen`);
  }
}
