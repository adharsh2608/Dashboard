# TurboPlanner (Task Management Dashboard)

A secure and responsive task dashboard built with Angular and TailwindCSS. Authenticated users can view, create, edit, delete, sort, filter, and reorder tasks with drag-and-drop. Includes dark/light mode, keyboard shortcuts, and basic test coverage.

## Setup

```bash
# 1) Install
npm ci

# 2) Start dev server
npm start
# then open the URL printed in terminal (Angular may pick a free port if 4200 is busy)

# 3) Run unit tests
ng test --watch=false

# 4) Production build
npm run build
```

## Login (Mock Auth)
- Username: `admin`
- Password: `admin123`
- On success, a mock JWT is stored in `localStorage` and attached to all HTTP requests via an interceptor as `Authorization: Bearer <token>`.
- This is a simulated flow; no real backend verification is performed.

## Architecture Overview

```
src/
  app/
    auth/
      auth.service.ts         # Mock JWT login + token storage (SSR-safe)
      auth.guard.ts           # Route guard checks isAuthenticated()
      auth.interceptor.ts     # Adds Authorization header for all HTTP calls
      login.component.ts/.html# Modal-style login UI
    components/
      task-dashboard/         # Main dashboard (standalone)
        task-dashboard.component.ts/.html/.css
        views/                # Lazy-loaded placeholders (today/upcoming/team)
      add-task-modal/         # Reusable modal for add/edit task
      task-card/              # Presentational card (used in tests/demo)
    tasks/
      task.model.ts           # Task domain model (id, title, category, completed)
      task.service.ts         # RxJS BehaviorSubject store for tasks
    shared/
      theme.service.ts        # Dark/light theme toggling with persistence
      reorder.util.ts         # Reusable array reorder helper for DnD
  styles.css                  # Tailwind layers + dark background handling
  main.ts                     # Bootstraps the app
```

### Component Structure
- `TaskDashboardComponent` (standalone): orchestrates UI state (filters, sort, modal open), subscribes to `TaskService` for data, exposes actions (add/edit/delete/toggle/reorder) and keyboard shortcuts.
- `AddTaskModalComponent` (standalone): captures task fields (`title`, `category`, `completed`) and emits created/edited tasks.
- `TaskCardComponent` (standalone): presentational card used by tests/demo; resilient to missing inputs.

### Routing
- `/login`: Login screen (mock auth)
- `/dashboard`: Protected by `AuthGuard`; renders the dashboard. Child routes are lazily loaded placeholders.

## State Management Strategy
- Tasks: RxJS service store using `BehaviorSubject` in `TaskService`.
  - `tasks$` observable provides a reactive stream.
  - Methods: `addTask`, `editTask`, `deleteTask`, `toggleCompletion` push updates.
- Theme: `ThemeService` exposes `isDark$` and persists preference; toggled via a top-right slider.
- Auth: `AuthService` holds token in `localStorage` (guarded for SSR) and exposes `isAuthenticated()`.
- View/UI State: Local to `TaskDashboardComponent` (`searchQuery`, filters, sort, modal visibility, keyboard shortcuts). First-letter search filter is applied client-side.

## Features
- View, create, edit, delete tasks
- Sort by title/category/completion; filter by category; first-letter search
- Drag-and-drop reordering
- Completion toggle (checkbox)
- Dark/light mode (top-right slider), persisted
- Keyboard shortcuts:
  - `n`: open add task
  - `/`: focus search
  - `Esc`: close modal or clear search

## Testing
- Run: `ng test --watch=false`
- Coverage focuses on:
  - `TaskService` behavior updates (store semantics)
  - Presentational components (`TaskCardComponent`)
  - App shell configuration


## Notes
- The JWT is mocked to demonstrate end-to-end wiring without a backend.
- The project uses Angular standalone components and TailwindCSS with class-based dark mode.
