import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItem {
  @Input() todo!: { id: number; title: string; completed: boolean; userId: number };

  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<{ id: number; title: string }>();

  emitToggleTodo(id: number): void {
    this.toggle.emit(this.todo.id);
  }

  emitDeleteTodo(id: number): void {
    this.delete.emit(this.todo.id);
  }

  emitUpdateTodo(id: number, title: string): void {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    console.log('Update emitted from item:', { id, title: trimmedTitle });
    this.update.emit({ id, title: trimmedTitle });
  }
}
