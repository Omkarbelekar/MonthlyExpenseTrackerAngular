import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-monthly-expense',
  templateUrl: './monthly-expense.component.html',
  styleUrls: ['./monthly-expense.component.css']
})
export class MonthlyExpenseComponent implements OnInit {

  constructor(private router: Router, private ExpenseService: ExpenseService,private toastService: ToastService) { }
  userInfo: any;
  categoriesData: any[] = [];
  totalAllowedExpenses: number = 0;
  totalActualExpenses: number = 0;
  totalDifference: number = 0;
  FromDate: string = '';
  ToDate: string = '';
  ngOnInit(): void {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    this.FromDate = this.formatDateLocal(firstDay);
    this.ToDate = this.formatDateLocal(today);
    const userInfoStr = sessionStorage.getItem('UserInfo');
    if (userInfoStr) {
      this.userInfo = JSON.parse(userInfoStr);
    }
    this.getMonthlyExpenseData();
  }
  formatDateLocal(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  btnAddCategory() {
    this.router.navigate(['/add-category']);
  }
  btnAddExpense() {
    this.router.navigate(['/add-new-expense']);
  }
  formatCurrency(value: number): string {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  addNewExpense(categoryId: string): void {
    this.router.navigate(['/add-new-expense'], { queryParams: { Mode: 'A', categoryId: categoryId } });
  }
  ChangeDt(){
    this.getMonthlyExpenseData();
  }
  getMonthlyExpenseData() {
    debugger;
    if (this.userInfo && this.userInfo.Id) {
      let id = this.userInfo.Id.toString();
      let obj = {
        UserId: id,
        FromDt: this.FromDate,
        ToDt: this.ToDate
      }
      this.ExpenseService.getMonthlyExpensesByUser(obj).subscribe({
        next: response => {
          if (response) {
            debugger;
            this.categoriesData = response as any[];
            this.calculateTotals();
          }
        },
        error: err => {
          console.error('Error fetching monthly expense data:', err);
        }
      });
    }
  }
  calculateTotals(): void {
    this.totalAllowedExpenses = this.categoriesData.reduce((sum, cat) => sum + cat.AllowExpenseLimit, 0);
    this.totalActualExpenses = this.categoriesData.reduce((sum, cat) => sum + cat.ActualExpense, 0);
    this.totalDifference = this.totalAllowedExpenses - this.totalActualExpenses;
  }
  editCategory(categoryId: number): void {
    this.router.navigate(['/add-category'], { queryParams: { Mode: 'E', categoryId: categoryId } });
  }
  deleteCategory(categoryId: number): void {
    debugger;
    // Show confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (confirmDelete) {
      debugger;
      if (categoryId) {
        this.ExpenseService.deleteCategory(categoryId).subscribe({
          next: response => {
            if (response.toString() === 'true') {
              this.toastService.show('Category deleted successfully', 'success');
              this.getMonthlyExpenseData();
            } else {
              this.toastService.show('Failed to delete category. Please try again.', 'error');
            }
          },
          error: err => {
            console.error('Error fetching monthly expense data:', err);
          }
        });
      }
    }
  }
}
