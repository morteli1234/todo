import { ChangeDetectorRef, Component } from '@angular/core';
import { TodoModel } from '../../models/todo.models';
import { TodoItem } from '../todo-item/todo-item';
import { TodoForm } from '../todo-form/todo-form';
import { HttpclientService } from '../../services/httpclient/httpclient.service';

@Component({
  selector: 'app-todo-list',
  imports: [TodoForm, TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList {
  constructor(
    // private todoService: TodoService,
    private httpclientService: HttpclientService,
    private cdr: ChangeDetectorRef,
  ) {}

  todos: TodoModel[] = [];

  ngOnInit(): void {
    this.httpclientService.getTodoFromApi().subscribe((apitodos) => {
      this.todos = apitodos;
      this.cdr.detectChanges();
    });
  }

  // addTodo(text: string): void {
  //   const newTodo = { title: text, completed: false, userId: 1 };
  //   this.httpclientService.createData(newTodo).subscribe((created: any) => {
  //     this.todos = [
  //       ...this.todos,
  //       { id: created.id ?? Date.now(), title: text, completed: false, userId: 1 },
  //     ];
  //     this.cdr.detectChanges();
  //   });
  // }

  addTodo(text: string): void {
    const payload = { title: text, completed: false, userId: 1 };
    console.log('POST payload:', payload);

    this.httpclientService.createData(payload).subscribe({
      next: (created) => {
        console.log('POST response:', created);
        this.todos = [
          ...this.todos,
          {
            id: Date.now(),
            //id: created.id ?? Date.now(), // With current API the same ID was alaways returned, so using Date.now() to ensure unique IDs in the UI
            title: created.title ?? text,
            completed: created.completed ?? false,
            userId: created.userId ?? 1,
          },
        ];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('POST failed:', err);
      },
    });
  }
  toggleTodo(id: number): void {
    const current = this.todos.find((t) => t.id === id);
    if (!current) return;

    const payload = { completed: !current.completed };
    this.httpclientService.updateData(id, payload).subscribe(() => {
      this.todos = this.todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
      this.cdr.detectChanges();
    });
  }

  deleteTodo(id: number): void {
    this.httpclientService.deleteData(id).subscribe({
      next: (res) => {
        console.log('Todo deleted successfully:', res);
        this.todos = this.todos.filter((t) => t.id !== id);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to delete todo:', err);
      },
    });
  }
}

//   get todos$(): Observable<TodoModel[]> {
//   return this.httpclientService.getTodoFromApi();
// }

// get todos(): TodoModel[] {
//   return this.todoService.getTodos();
// }

// addTodo(text: string): void {
//   this.todoService.addTodo(text);
// }

// toggleTodo(id: number): void {
//   this.todoService.toggleTodo(id);
// }
// deleteTodo(id: number): void {
//   this.todoService.deleteTodo(id);
// }
