import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.css']
})
export class SidebarLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
NavigateToDashboard(){
  this.router.navigate(['/dashboard']);
}
NavigateToCreateGrp(){
  debugger
  this.router.navigate(['/CreateGroup']);
}
}
