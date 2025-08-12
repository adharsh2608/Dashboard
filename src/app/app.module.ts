import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TaskDashboardComponent } from './components/task-dashboard/task-dashboard.component';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(TaskDashboardComponent, {
  providers: []
});
