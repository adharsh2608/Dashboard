import { Component, HostListener, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Task } from '../../tasks/task.model';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { TaskService } from '../../tasks/task.service';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../shared/theme.service';
import { reorderArray } from '../../shared/reorder.util';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    DragDropModule,
    FormsModule,
    AddTaskModalComponent
  ]
})
export class TaskDashboardComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchQuery = '';
  selectedCategory: 'All' | 'Work' | 'Personal' = 'All';
  sortBy: 'title' | 'completed' | 'category' = 'title';
  isDark = false;
  showModal = false;
  editingTask: Task | null = null;
  progressPercent = 0;

  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  private subscription: Subscription | null = null;

  constructor(private taskService: TaskService, private theme: ThemeService) {}

  ngOnInit(): void {
    this.subscription = this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilters();
    });
    this.theme.isDark$.subscribe(v => (this.isDark = v));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getProgress(tasks: Task[]): number {
    if (!tasks.length) return 0;
    const done = tasks.filter(t => t.completed).length;
    return Math.round((done / tasks.length) * 100);
  }

  toggleTheme() {
    this.theme.toggleTheme();
  }

  openAddTaskModal(task: Task | null = null) {
    this.editingTask = task;
    this.showModal = true;
  }

  closeAddTaskModal() {
    this.showModal = false;
    this.editingTask = null;
  }

  addTaskToList(task: Task) {
    if (this.editingTask) {
      this.taskService.editTask(this.editingTask.id, {
        title: task.title,
        category: task.category,
        completed: task.completed
      });
    } else {
      this.taskService.addTask({ id: 0, title: task.title, category: task.category, completed: task.completed });
    }
    this.closeAddTaskModal();
    this.applyFilters();
  }

  onDeleteTask(index: number) {
    const taskToDelete = this.filteredTasks[index];
    this.taskService.deleteTask(taskToDelete.id);
    this.applyFilters();
  }

  onEditTask(index: number) {
    const taskToEdit = this.filteredTasks[index];
    this.openAddTaskModal(taskToEdit);
  }

  toggleCompletion(task: Task) {
    this.taskService.toggleCompletion(task.id);
    this.applyFilters();
  }

  onSearch() {
    this.applyFilters();
  }

  clearSearch() {
    this.searchQuery = '';
    this.applyFilters();
  }

  setCategory(category: 'All' | 'Work' | 'Personal') {
    this.selectedCategory = category;
    this.applyFilters();
  }

  setSort(sortBy: 'title' | 'completed' | 'category') {
    this.sortBy = sortBy;
    this.applyFilters();
  }

  private applyFilters() {
    const firstLetter = this.searchQuery.trim().toLowerCase()[0];
    let results = [...this.tasks];

    if (firstLetter) {
      results = results.filter(t => t.title.toLowerCase().startsWith(firstLetter));
    }
    if (this.selectedCategory !== 'All') {
      results = results.filter(t => t.category === this.selectedCategory);
    }

    results.sort((a, b) => {
      if (this.sortBy === 'title') return a.title.localeCompare(b.title);
      if (this.sortBy === 'category') return a.category.localeCompare(b.category);
      return Number(a.completed) - Number(b.completed);
    });

    this.filteredTasks = results;
    this.progressPercent = this.getProgress(results);
  }

  drop(event: CdkDragDrop<Task[]>) {
    const fromTask = this.filteredTasks[event.previousIndex];
    const toTask = this.filteredTasks[event.currentIndex];
    const fromIndex = this.tasks.findIndex(t => t.id === fromTask.id);
    const toIndex = this.tasks.findIndex(t => t.id === toTask.id);
    if (fromIndex !== -1 && toIndex !== -1) {
      this.tasks = reorderArray(this.tasks, fromIndex, toIndex);
      this.filteredTasks = reorderArray(this.filteredTasks, event.previousIndex, event.currentIndex);
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (e.key === 'n' && !this.showModal) {
      e.preventDefault();
      this.openAddTaskModal();
    } else if (e.key === '/' && !this.showModal) {
      e.preventDefault();
      this.searchInput?.nativeElement.focus();
    } else if (e.key === 'Escape') {
      if (this.showModal) {
        this.closeAddTaskModal();
      } else if (this.searchQuery) {
        this.clearSearch();
      }
    }
  }
}
