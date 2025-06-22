import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { CreateGroupComponent } from './components/group/create-group/create-group.component';
import { AddExpenseComponent } from './components/expense/add-expense/add-expense.component';
import { ExpenseHistoryComponent } from './components/expense/expense-history/expense-history.component';
import { GroupBalancesComponent } from './components/balances/group-balances/group-balances.component';
import { AddNewCategoryComponent } from './components/add-new-category/add-new-category.component';
import { AddNewCategoryExpenseComponent } from './components/add-new-category-expense/add-new-category-expense.component';
import { MonthlyExpenseComponent } from './components/monthly-expense/monthly-expense.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/monthly-expense', pathMatch: 'full' },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'create-group', component: CreateGroupComponent },
//   { path: 'add-expense', component: AddExpenseComponent },
//   { path: 'expense-history', component: ExpenseHistoryComponent },
//   { path: 'group-balances', component: GroupBalancesComponent },
//   { path: 'add-new-expense', component: AddNewCategoryExpenseComponent },
//   { path: 'monthly-expense', component: MonthlyExpenseComponent },
//   { path: 'add-category', component: AddNewCategoryComponent }
// ];
const routes: Routes = [
  { path: '', redirectTo: '/monthly-expense', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'monthly-expense', component: MonthlyExpenseComponent, canActivate: [AuthGuard] },
  { path: 'add-expense', component: AddExpenseComponent, canActivate: [AuthGuard] },
  { path: 'expense-history', component: ExpenseHistoryComponent, canActivate: [AuthGuard] },
  { path: 'group-balances', component: GroupBalancesComponent, canActivate: [AuthGuard] },
  { path: 'add-new-expense', component: AddNewCategoryExpenseComponent, canActivate: [AuthGuard] },
  { path: 'add-category', component: AddNewCategoryComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }, // No guard needed for login
  { path: 'register', component: RegisterComponent }, // No guard needed for register
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
