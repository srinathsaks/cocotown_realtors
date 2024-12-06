import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logins',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './logins.component.html',
  styleUrl: './logins.component.scss'
})
export class LoginsComponent {

  username = '';
  password = '';
  isLoginMode = true; 
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit() {
    try {
        if (this.isLoginMode) {
            const response = await this.authService.login(this.username, this.password);
            localStorage.setItem('token', response.token);
            this.router.navigate(['/dashboard']);
        } else {
            await this.authService.register(this.username, this.password);
            this.isLoginMode = true;
            alert('Registration successful! Please log in.');
        }
    } catch (err: any) {
        console.error('Error during registration/login:', err); 
        this.errorMessage = err.response?.data?.message || 'An error occurred.';
    }
}

}
