import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="text-2xl font-bold mb-4">Upcoming</h1>
    <p>Upcoming tasks will appear here.</p>
  `
})
export class UpcomingComponent {}
