import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.apiUrl}/Users`;

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/Register`, user);
  }

  // login(obj: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, { obj });
  // }
  login(obj: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, obj);
  }

}
