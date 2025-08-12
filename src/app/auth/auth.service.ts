import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'mock_jwt_token';
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      const token = 'mock-jwt-token.' + (this.isBrowser() ? btoa(`${username}:${Date.now()}`) : 'server');
      if (this.isBrowser()) {
        localStorage.setItem(this.storageKey, token);
      }
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return this.isBrowser() ? !!localStorage.getItem(this.storageKey) : false;
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem(this.storageKey) : null;
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.storageKey);
    }
  }
}
