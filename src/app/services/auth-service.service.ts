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
    return !!sessionStorage.getItem(this.tokenKey); // Check if token exists
  }
  
}
