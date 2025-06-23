import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-expense-history',
  templateUrl: './expense-history.component.html',
  styleUrls: ['./expense-history.component.css']
})
export class ExpenseHistoryComponent implements OnInit {

  constructor(private router: Router, private ExpenseService: ExpenseService, private route: ActivatedRoute, private toastService: ToastService) {
  }
categoriesData: any[] = [];
  CategoryName: string = '';
  userInfo: any;
  mode: string = 'A';
  categoryId: any = '';
  FromDate: string = '';
  ToDate: string = '';
  ngOnInit(): void {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    
    
    const userInfoStr = sessionStorage.getItem('UserInfo');
    if (userInfoStr) {
      this.userInfo = JSON.parse(userInfoStr);
    }
    this.route.queryParams.subscribe(params => {
      this.mode = params['Mode'];
      this.categoryId = params['categoryId'];
      this.FromDate = params['FromDate'];
      this.ToDate = params['ToDate'];
    });
    if(this.FromDate == undefined || this.FromDate == null){
      this.FromDate = this.formatDateLocal(firstDay);
    }
    if(this.ToDate == undefined || this.ToDate == null){
      this.ToDate = this.formatDateLocal(today);
    }
    if(this.categoryId != undefined && this.categoryId != null && this.categoryId != '') {
      this.getExepenseHistByCat();
    }
  }
  formatDateLocal(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  getExepenseHistByCat() {
    let obj = {
      UserId: this.userInfo.Id,
      categoryId: this.categoryId,
      FromDt: this.FromDate,
      ToDt: this.ToDate
    }
    this.ExpenseService.getExepenseHistByCat(obj).subscribe({
      next: response => {
        if (response) {
          this.categoriesData = response as any[];
          this.CategoryName = this.categoriesData.length > 0 ? this.categoriesData[0].CategoryName : '';
        }
      },
      error: err => {
        console.error('Error fetching categories:', err);
      }
    });
  }
  btnBack() {
    this.router.navigate(['/monthly-expense']);
  }
  formatCurrency(value: number): string {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  editExpense(ExpenseMasterId: any) {
    this.router.navigate(['/add-new-expense'], { queryParams: { Mode: 'E', ExpenseMasterId: ExpenseMasterId } });
  }
  deleteExpense(ExpenseMasterId: any) {
    this.ExpenseService.deleteExpense(ExpenseMasterId).subscribe({
      next: response => {
        if (response) {
          this.toastService.show('Expense deleted successfully','success');
          this.getExepenseHistByCat();
        }
      },
      error: err => {
        console.error('Error deleting expense:', err);
        this.toastService.show('Failed to delete expense','error');
      }
    });
  }
}
