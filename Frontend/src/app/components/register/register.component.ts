import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterServiceService } from '../../services/register-service.service';
import { User } from '../../Interfaces/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  errorMessage: string = '';

  constructor(private registerService: RegisterServiceService, private router: Router) {}

  onSubmit(form: any) {
    if (form.valid && this.formData.password === this.formData.confirmPassword) {
      const newUser: User = {
        name: this.formData.name,
        email: this.formData.email,
        password: this.formData.password
      };

      this.registerService.addUser(newUser).subscribe(
        (response) => {
          console.log('User registered successfully', response);
          this.router.navigate(['/logIn']);
        },
        (error) => {
          console.error('Error registering user', error);
          this.errorMessage = error;
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
