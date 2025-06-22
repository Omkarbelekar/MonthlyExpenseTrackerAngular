import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private http: HttpClient,
    private authService: AuthServiceService,
    private router: Router,
    private toastService: ToastService) { }

  email: string = '';
  password: string = '';

  ngOnInit(): void {
    this.authService.logout();
  }

  onLogin() {
    debugger;
    if (this.email == '' || this.email == null || this.email == undefined) {
      this.toastService.show('Please Enter Email Address', 'info');
      return;
    }
    else if (this.password == '' || this.password == null || this.password == undefined) {
      this.toastService.show('Please Enter Password', 'info');
      return;
    }
    let obj = {
      Email: this.email,
      PasswordHash: this.password
    }
    this.userService.login(obj).subscribe({
      next: response => {
        debugger;
        const token = response.Token || 'dummy_token'; // replace as needed
        this.authService.login(token);  // <-- Save token
        sessionStorage.setItem('UserInfo', JSON.stringify(response));
        this.toastService.show('Login Successfully', 'success');
        this.router.navigate(['/monthly-expense']); // <-- Redirect to dashboard
      },
      error: err => {
        if (err.status === 401) {
          // Handle unauthorized error
          this.toastService.show('Invalid email or password. Please try again.', 'error');
        } else {
          // Handle other errors
          this.toastService.show('An error occurred. Please try again later.', 'error');
        }
        console.error('Login failed:', err);
      }
    });
  }

}
