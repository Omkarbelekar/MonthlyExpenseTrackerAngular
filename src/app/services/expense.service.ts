import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = `${environment.apiUrl}/Expenses`;

  constructor(private http: HttpClient) { }

  addExpense(data: any) {
    return this.http.post(this.apiUrl, data);
  }
  addCatExpense(data: any) {
    return this.http.post(this.apiUrl + '/addCatExpense', data);
  }
  addCategory(data: any) {
    return this.http.post(this.apiUrl + '/AddNewExpenseCategory', data);
  }
  getExpensesByGroup(groupId: any) {
    return this.http.get<any[]>(`${this.apiUrl}/Group/${groupId}`);
  }
  getMonthlyExpensesByUser(data: any) {
    // return this.http.get<any[]>(`${this.apiUrl}/MonthlyExpensesByUser`, data);
    return this.http.post(this.apiUrl+'/MonthlyExpensesByUser', data);
  }
  getExepenseHistByCat(data: any) {
    // return this.http.get<any[]>(`${this.apiUrl}/MonthlyExpensesByUser`, data);
    return this.http.post(this.apiUrl+'/getExepenseHistByCat', data);
  }
  deleteCategory(CategoryMasterId: any) {
    return this.http.get<any[]>(`${this.apiUrl}/deleteCategory/${CategoryMasterId}`);
  }
  deleteExpense(ExpenseMasterId: any) {
    return this.http.get<any[]>(`${this.apiUrl}/deleteExpense/${ExpenseMasterId}`);
  }
  getExpenseData(ExpenseMasterId: any) {
    return this.http.get<any[]>(`${this.apiUrl}/getExpenseData/${ExpenseMasterId}`);
  }
  getCategoryById(CategoryMasterId: any) {
    return this.http.get<any[]>(`${this.apiUrl}/getCategoryById/${CategoryMasterId}`);
  }
  getRecentExpenses(userId: any) {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/RecentExpenses`);
  }
}
