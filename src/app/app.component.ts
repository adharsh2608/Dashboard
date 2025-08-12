import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskDashboardComponent } from "./components/task-dashboard/task-dashboard.component";
import { ThemeService } from './shared/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-dashboard';
  constructor(theme: ThemeService) {
    theme.initTheme();
  }
}
