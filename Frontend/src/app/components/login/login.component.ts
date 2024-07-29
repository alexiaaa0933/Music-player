import { Component } from '@angular/core';
import { LoginServiceService } from '../../services/login-service.service';
import { Router } from '@angular/router';
import { User } from '../../Interfaces/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  errorMessage: string = '';
  passwordFieldType: string = 'password'; // Add this line

  constructor(private loginService: LoginServiceService, private router: Router) {}

  onSubmit(form: any) {
    if (form.valid) {
      const loginUser: User = {
        name: "", 
        email: this.loginData.email,
        password: this.loginData.password
      };

      this.loginService.login(loginUser).subscribe(
        (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/display-list', loginUser.email]);
          this.errorMessage = '';
        },
        (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'This account is not valid.';
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
