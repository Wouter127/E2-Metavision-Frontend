import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  reverseGeocoding(latitude: string, longitude: string): Observable<any> {
    return this.httpClient.get<any>(`https://eu1.locationiq.com/v1/reverse.php?key=pk.8d54de504e47d69c5ec7005e6f63b7f5&lat=${latitude}&lon=${longitude}&format=json`);
  }
}
