import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  imports: [CommonModule, NgClass],
  styleUrls: ['./task-card.component.css'],
  standalone: true
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() index!: number;

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
}
