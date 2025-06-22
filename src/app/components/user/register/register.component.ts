import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { ToastService } from 'src/app/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    id: 0,
    name: '',
    email: '',
    passwordHash: ''
  };

  constructor(private userService: UserService, private toastService: ToastService,private router: Router,) { }

  ngOnInit(): void {
  }

  onRegister() {
    debugger;
    if (this.user.name == '' || this.user.name == null || this.user.name == undefined) {
      this.toastService.show('Please enter name', 'info');
      return;
    }
    else if (this.user.email == '' || this.user.email == null || this.user.email == undefined) {
      this.toastService.show('Please enter email address', 'info');
      return;
    }
    else if (this.user.passwordHash == '' || this.user.passwordHash == null || this.user.passwordHash == undefined) {
      this.toastService.show('Please enter password', 'info');
      return;
    } else if (this.user.passwordHash.length < 0) {
      this.toastService.show('Please enter password', 'info');
      return;
    }
    this.userService.register(this.user).subscribe({
      next: response => {
        debugger;
        this.toastService.show('Account created successfully. Please Login', 'success');
        this.router.navigate(['/login']);
      },
      error: err => {
        if (err.status === 400) {
          // Handle bad request error
          this.toastService.show('Email already exists. Please use a different email.', 'error');
        } else {
          // Handle other errors
          this.toastService.show('An error occurred. Please try again later.', 'error');
        }
      }
    });
  }
}
