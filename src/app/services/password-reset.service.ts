import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private httpClient: HttpClient) { }


stuurPasswoordResetLink(data: any) {
  return this.httpClient.post(`${environment.API_URI}/stuurPasswordResetLink`, data)
}

veranderPassword(data: any) {
  return this.httpClient.post(`${environment.API_URI}/veranderPassword`, data)

}

}
