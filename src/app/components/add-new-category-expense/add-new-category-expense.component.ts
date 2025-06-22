import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-add-new-category-expense',
  templateUrl: './add-new-category-expense.component.html',
  styleUrls: ['./add-new-category-expense.component.css']
})
export class AddNewCategoryExpenseComponent implements OnInit {


  constructor(private router: Router, private ExpenseService: ExpenseService, private route: ActivatedRoute,private toastService: ToastService) {
  }
  userInfo: any;
  categoriesData: any[] = [];
  SelCategoryMasterId: any = '';
  categoryId: any = '';
  AllowedExpense: number = 0;
  RemainingExpense: number = 0;
  ExpenseDate: string = '';
  Purpose: string = '';
  mode: string = 'A';
  ExpenseAmt: number = 0;
  FromDate: string = '';
  ToDate: string = '';
  ngOnInit(): void {
    const today = new Date();
    this.ExpenseDate = this.formatDateLocal(today);
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    this.FromDate = this.formatDateLocal(firstDay);
    this.ToDate = this.formatDateLocal(today);
    const userInfoStr = sessionStorage.getItem('UserInfo');
    if (userInfoStr) {
      this.userInfo = JSON.parse(userInfoStr);
    }
    this.getAllCategories();
    this.route.queryParams.subscribe(params => {
      this.mode = params['Mode'];
      this.categoryId = params['categoryId'];
    });
  }
  formatDateLocal(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  btnBack() {
    this.router.navigate(['/monthly-expense']);
  }
  getAllCategories() {
    let obj = {
      UserId: this.userInfo.Id,
      FromDt: this.FromDate,
      ToDt: this.ToDate
    }
    this.ExpenseService.getMonthlyExpensesByUser(obj).subscribe({
      next: response => {
        if (response) {
          this.categoriesData = response as any[];
          if (this.categoryId != undefined && this.categoryId != null && this.categoryId != '') {
            this.SelCategoryMasterId = this.categoryId;
            this.onCategoryChange();
          }
        }
      },
      error: err => {
        console.error('Error fetching categories:', err);
      }
    });
  }
  onCategoryChange() {
    if (this.SelCategoryMasterId) {
      let FilteredCategory = this.categoriesData.find(category => category.CategoryMasterId === this.SelCategoryMasterId);
      if (FilteredCategory) {
        this.AllowedExpense = FilteredCategory.AllowExpenseLimit;
        this.RemainingExpense = FilteredCategory.AllowExpenseLimit - FilteredCategory.ActualExpense;
      }
    } else {
      this.AllowedExpense = 0;
      this.RemainingExpense = 0;
    }
  }
  onSubmit() {
    debugger;
    const trimmedPurpose = this.Purpose.trim();
    const expenseAmtVal = this.ExpenseAmt;

    if (this.SelCategoryMasterId == '' || this.SelCategoryMasterId == null || this.SelCategoryMasterId == undefined) {
      this.toastService.show('Please select a category', 'info');
      return;
    }
    else if (expenseAmtVal === null || expenseAmtVal <= 0) {
      this.toastService.show('Expense Amount must be a valid number greater than zero', 'info');
      return;
    }

    let data = {
      CategoryMasterId: this.SelCategoryMasterId,
      ExpenseDate: this.ExpenseDate,
      Purpose: trimmedPurpose,
      ExpenseAmt: expenseAmtVal,
      UserId: this.userInfo.Id,
      Mode: this.mode
    };

    this.ExpenseService.addCatExpense(data).subscribe({
      next: response => {
        if (response) {
          if (this.mode === 'E') {
            this.toastService.show('Please Enter Email AddressExpense updated successfully', 'success');
          } else {
            this.toastService.show('Expense added successfully', 'success');
          }
          this.SelCategoryMasterId = '';
          const today = new Date();
          this.ExpenseDate = today.toISOString().split('T')[0];
          this.Purpose = '';
          this.ExpenseAmt = 0;
          this.AllowedExpense = 0;
          this.RemainingExpense = 0;
        }
      },
      error: err => {
        this.toastService.show('Failed to add expense. Please try again later', 'error');
      }
    });
  }
}
