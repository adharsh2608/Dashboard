import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="text-2xl font-bold mb-4">Team</h1>
    <p>Team tasks will be shown here.</p>
  `
})
export class TeamComponent {}
