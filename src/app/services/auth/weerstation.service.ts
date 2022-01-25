import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthWeerstationService {

  constructor(private httpClient: HttpClient) { }

  getLaatsteMeting(weerstation_id: number): Observable<any> {
    return this.httpClient.get<any[]>(`${environment.API_URI}/auth/meting/${weerstation_id}/laatsteMeting`);
  }
  
  getWeerstationWithMetingen(weerstation_id:number):Observable<Weerstation> {
      return this.httpClient.get<Weerstation>(`${environment.API_URI}/auth/weerstations/${weerstation_id}/metingen`);
  }
}
