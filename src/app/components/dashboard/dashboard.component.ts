import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userId = 1; // replace with logged-in user ID from auth service
  groups: any[] = [];
  recentExpenses: any[] = [];
  constructor(
    private groupService: GroupService,
    private expenseService: ExpenseService
  ) {}

  ngOnInit() {
    this.groupService.getGroupsByUser(this.userId).subscribe(data => {
      this.groups = data;
    });

    this.expenseService.getRecentExpenses(this.userId).subscribe(data => {
      this.recentExpenses = data;
    });
  }

}
