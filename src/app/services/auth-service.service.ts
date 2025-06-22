import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private readonly tokenKey = 'auth_token';

  login(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }
  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem('UserInfo');
  }
  isLoggedIn(): boolean {
    const userInfo = localStorage.getItem('UserInfo');
    return !!userInfo; // returns true if userInfo exists
  }


}
