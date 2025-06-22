import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Group } from '../models/group.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = `${environment.apiUrl}/Groups`;

  constructor(private http: HttpClient) {}

  createGroup(group: Group): Observable<any> {
    return this.http.post(this.apiUrl + '/Create', group);
  }
  getAllGroups() {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  getGroupBalances(groupId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/${groupId}/Balances`);
  }

  getGroupsByUser(userId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/userId`);
  }
}
