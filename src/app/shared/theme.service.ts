import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'theme';
  private isDarkSubject = new BehaviorSubject<boolean>(false);
  isDark$ = this.isDarkSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  initTheme(): void {
    const prefersDark = this.isBrowser() && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const stored = this.getStoredTheme();
    const isDark = stored ? stored === 'dark' : prefersDark;
    this.setTheme(isDark);
  }

  toggleTheme(): void {
    this.setTheme(!this.isDarkSubject.value);
  }

  setTheme(isDark: boolean): void {
    this.isDarkSubject.next(isDark);
    if (this.isBrowser()) {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add('dark');
        localStorage.setItem(this.storageKey, 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem(this.storageKey, 'light');
      }
    }
  }

  private getStoredTheme(): string | null {
    return this.isBrowser() ? localStorage.getItem(this.storageKey) : null;
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}