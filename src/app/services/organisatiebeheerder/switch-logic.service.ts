import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SwithLogic } from 'src/app/interfaces/Switch-logic';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SwitchLogicService {

  constructor(private httpClient: HttpClient) { }

  getSwitches(): Observable<SwithLogic> {
    return this.httpClient.get<SwithLogic>(`${environment.API_URI}/organisatiebeheerder/switches`);
  }
}
