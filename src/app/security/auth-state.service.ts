import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  private gebruikerState = new BehaviorSubject<boolean>(this.tokenService.isLoggedIn());
  gebruikerAuthState = this.gebruikerState.asObservable();  

  constructor(public tokenService: TokenService) { }

  setAuthState(value: boolean) {
    this.gebruikerState.next(value);
  }
}
