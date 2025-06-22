import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';
import { ToastService } from 'src/app/toast.service';


@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.css']
})
export class AddNewCategoryComponent implements OnInit {

  constructor(private router: Router, private ExpenseService: ExpenseService, private route: ActivatedRoute,private toastService: ToastService) {
    debugger;
    // const navigation = this.router.getCurrentNavigation();
    // if (navigation?.extras?.state) {
    //   this.mode = navigation.extras.state['Mode'];
    //   this.categoryId = navigation.extras.state['categoryId'];
    //   if(this.mode == 'E' && this.categoryId != null && this.categoryId != undefined && this.categoryId != '') {
    //     this.getCategoryById();
    //   }
    // }
  }
  mode: any = 'A';
  categoryId: any | null = null;
  categoryName: string = '';
  allowExpense: number = 0;
  userInfo: any;
  ngOnInit(): void {
    debugger;
    const userInfoStr = sessionStorage.getItem('UserInfo');
    if (userInfoStr) {
      this.userInfo = JSON.parse(userInfoStr);
    }
    this.route.queryParams.subscribe(params => {
      this.mode = params['Mode'];
      this.categoryId = params['categoryId'];
      if (this.mode === 'E' && this.categoryId) {
        this.getCategoryById();
      }
    });
  }
  btnBack() {
    this.router.navigate(['/monthly-expense']);
  }

  onSubmit(): void {
    debugger;
    const trimmedCategoryName = this.categoryName.trim();
    const allowExpenseVal = this.allowExpense;

    if (trimmedCategoryName == '' || trimmedCategoryName == null || trimmedCategoryName == undefined) {
      alert('Category Name is required.');
      this.toastService.show('Category Name is required', 'info');
      return;
    }
    else if (allowExpenseVal < 0) {
      this.toastService.show('Allow Expense must be a valid number zero or greater', 'info');
      return;
    }
    let obj = {
      CategoryName: trimmedCategoryName,
      AllowExpenseLimit: allowExpenseVal,
      AddedBy: this.userInfo.Id,
      Mode: this.mode,
      CategoryMasterId: this.categoryId
    }
    this.ExpenseService.addCategory(obj).subscribe({
      next: response => {
        debugger;
        if (response == 'true') {
          if (this.mode === 'E') {
            this.toastService.show('Category updated successfully', 'success');
          } else {
            this.toastService.show('Category added successfully', 'success');
          }
          this.categoryName = '';
          this.allowExpense = 0;
          this.router.navigate(['/monthly-expense']);
        }
      },
      error: err => console.error('Login failed:', err)
    });
  }
  getCategoryById(): void {
    if (this.categoryId) {
      this.ExpenseService.getCategoryById(this.categoryId).subscribe({
        next: response => {
          debugger;
          if (response && Array.isArray(response) && response.length > 0) {
            this.categoryName = response[0].CategoryName;
            this.allowExpense = response[0].AllowExpenseLimit;
          }
        },
        error: err => console.error('Login failed:', err)
      });
    }
  }
  // onReset(form: HTMLFormElement): void {
  //   form.reset();
  //   this.categoryName = '';
  //   this.allowExpense = null; // Reset the allowExpense value
  //   // Focus on the category name input after reset
  //   const categoryNameInput = document.getElementById('categoryName') as HTMLInputElement;
  //   if (categoryNameInput) {
  //     categoryNameInput.focus();
  //   }
  // }
}
