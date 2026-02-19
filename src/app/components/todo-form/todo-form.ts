import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  imports: [],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.scss',
})
export class TodoForm {
  @Output() add = new EventEmitter<string>();

  submitTodo(text: string): void {
    this.add.emit(text);
  }
}
