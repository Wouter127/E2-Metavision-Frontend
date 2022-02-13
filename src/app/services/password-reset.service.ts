import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private httpClient: HttpClient) { }


stuurPasswoordResetLink(data: any) {
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  
  return this.httpClient.post(`${environment.API_URI}/stuurPasswordResetLink`, data, {headers: headers})
}

veranderPassword(data: any) {
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  
  return this.httpClient.post(`${environment.API_URI}/veranderPassword`, data, {headers: headers})

}

}
