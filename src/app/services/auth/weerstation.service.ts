import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthWeerstationService {

  constructor(private httpClient: HttpClient) { }

  getLaatsteMeting(weerstation_id: number): Observable<any> {
    return this.httpClient.get<any[]>(`${environment.API_URI}/auth/meting/${weerstation_id}/laatsteMeting`);
  }
}
