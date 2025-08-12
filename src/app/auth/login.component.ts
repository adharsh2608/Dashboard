import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.template.html',
  imports: [FormsModule, NgIf],
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  @Output() close = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const success = this.authService.login(this.username, this.password);
    if (success) {
      this.close.emit();
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid credentials. Try admin/admin123';
    }
  }

  onClose() {
    this.close.emit();
  }
}
