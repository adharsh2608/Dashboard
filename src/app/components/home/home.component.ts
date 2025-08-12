// src/app/components/home/home.component.ts
import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { LoginComponent } from '../../auth/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, LoginComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  showLoginModal = false;

  openLoginModal() {
    this.showLoginModal = true;
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }
}
