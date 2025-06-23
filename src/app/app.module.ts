import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule}from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { CreateGroupComponent } from './components/group/create-group/create-group.component';
import { AddExpenseComponent } from './components/expense/add-expense/add-expense.component';
import { ExpenseHistoryComponent } from './components/expense-history/expense-history.component';
import { GroupBalancesComponent } from './components/balances/group-balances/group-balances.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarLayoutComponent } from './sidebar-layout/sidebar-layout.component';
import { AddNewCategoryComponent } from './components/add-new-category/add-new-category.component';
import { AddNewCategoryExpenseComponent } from './components/add-new-category-expense/add-new-category-expense.component';
import { MonthlyExpenseComponent } from './components/monthly-expense/monthly-expense.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CreateGroupComponent,
    AddExpenseComponent,
    ExpenseHistoryComponent,
    GroupBalancesComponent,
    DashboardComponent,
    SidebarLayoutComponent,
    AddNewCategoryComponent,
    AddNewCategoryExpenseComponent,
    MonthlyExpenseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
