import { Component } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { TodoItem } from '../todo-item/todo-item';
import { TodoForm } from '../todo-form/todo-form';

@Component({
  selector: 'app-todo-list',
  imports: [TodoForm, TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList {
  constructor(private todoService: TodoService) {}

  get todos(): Todo[] {
    return this.todoService.getTodos();
  }

  addTodo(text: string): void {
    this.todoService.addTodo(text);
  }

  toggleTodo(id: number): void {
    this.todoService.toggleTodo(id);
  }
  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }
}
