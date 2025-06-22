import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense-history',
  templateUrl: './expense-history.component.html',
  styleUrls: ['./expense-history.component.css']
})
export class ExpenseHistoryComponent implements OnInit {

  expenses: any[] = [];
  groupId = 1; // You can later select dynamically

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.expenseService.getExpensesByGroup(this.groupId).subscribe(data => {
      this.expenses = data;
    });
  }
}
