import { Routes } from '@angular/router';
import { TaskDashboardComponent } from './components/task-dashboard/task-dashboard.component';
import { LoginComponent } from './auth/login.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: TaskDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'today', pathMatch: 'full' },
      { path: 'today', loadComponent: () => import('../../src/app/components/task-dashboard/views/today.component').then(m => m.TodayComponent) },
      { path: 'upcoming', loadComponent: () => import('../../src/app/components/task-dashboard/views/upcoming.component').then(m => m.UpcomingComponent) },
      { path: 'team', loadComponent: () => import('../../src/app/components/task-dashboard/views/team.component').then(m => m.TeamComponent) },
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
