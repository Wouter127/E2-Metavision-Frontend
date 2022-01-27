import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {

  constructor() { }

  login(): void {
    const url = `http://pruebas./sanctum/csrf-cookie`;
    this.http.get<any>(url).subscribe((res) => {
      console.log(res);
    })
  }
}
