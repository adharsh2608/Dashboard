// src/app/tasks/task.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [
    { id: 1, title: 'First task', category: 'Work', completed: false },
    { id: 2, title: 'Second task', category: 'Personal', completed: true }
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  addTask(task: Task): void {
    this.tasks.push({ ...task, id: Date.now() });
    this.tasksSubject.next(this.tasks);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next(this.tasks);
  }

  toggleCompletion(id: number): void {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(this.tasks);
  }

  editTask(id: number, updatedTask: Partial<Task>): void {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, ...updatedTask } : task
    );
    this.tasksSubject.next(this.tasks);
  }
}
