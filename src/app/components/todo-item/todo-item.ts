import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItem {
  @Input() todo!: { id: number; text: string; completed: boolean };

  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  emitToggleTodo(id: number): void {
    this.toggle.emit(this.todo.id);
  }

  emitDeleteTodo(id: number): void {
    this.delete.emit(this.todo.id);
  }
}
