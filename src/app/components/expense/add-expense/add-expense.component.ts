import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  expense = {
    description: '',
    amount: 0,
    groupId: 0,
    paidByUserId: 0,
    owedByUserIds: [] as number[]
  };

  groups: any[] = [];
  users: any[] = [];

  constructor(
    private expenseService: ExpenseService,
    private groupService: GroupService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.groupService.getAllGroups().subscribe((data:any) => this.groups = data);
    this.userService.getAllUsers().subscribe(data => this.users = data);
    console.log(this.groups);
    console.log(this.users);

  }

  toggleOwedBy(userId: number) {
    const index = this.expense.owedByUserIds.indexOf(userId);
    if (index > -1) {
      this.expense.owedByUserIds.splice(index, 1);
    } else {
      this.expense.owedByUserIds.push(userId);
    }
  }

  addExpense() {
    this.expenseService.addExpense(this.expense).subscribe({
      next: () => alert('Expense added and split! 🎉'),
      error: err => console.error('Error:', err)
    });
  }

}
