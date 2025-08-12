import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../tasks/task.model';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task-modal.component.html',
})
export class AddTaskModalComponent implements OnInit {
  @Input() task: Task | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() taskCreated = new EventEmitter<Task>();

  title = '';
  category: Task['category'] = 'Work';
  completed = false;

  ngOnInit() {
    if (this.task) {
      this.title = this.task.title;
      this.category = this.task.category;
      this.completed = this.task.completed;
    }
  }

  createTask() {
    const newTask: Task = {
      id: this.task?.id ?? 0,
      title: this.title,
      category: this.category,
      completed: this.completed
    };
    this.taskCreated.emit(newTask);
  }
}
