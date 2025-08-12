import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="text-2xl font-bold mb-4">Today</h1>
    <p>Tasks due today will appear here.</p>
  `
})
export class TodayComponent {}
