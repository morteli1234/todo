import { Injectable } from '@angular/core';
import { TodoModel } from '../../models/todo.models';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

type ApiTodo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = `${environment.apiBaseUrl}/todos`;

  // constructor(private http: HttpClient) {}

  private todos: TodoModel[] = [
    { id: 1, title: 'Learn Angular', completed: false, userId: 1 },
    { id: 2, title: 'Build Todo List', completed: true, userId: 1 },
  ];

  // getTodos(): Observable<Array<Todo>> {
  //   return this.http.get<ApiTodo[]>(this.apiUrl).pipe(
  //     map(apiTodos => apiTodos.map(todo => ({
  //       id: todo.id,
  //       text: todo.title,
  //       completed: todo.completed
  //     })))
  //   );
  // }

  getTodos(): TodoModel[] {
    return [...this.todos];
  }
  addTodo(text: string): void {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const newTodo: TodoModel = {
      id: Date.now(),
      title: trimmedText,
      completed: false,
      userId: 1,
    };

    this.todos.push(newTodo);
  }
  toggleTodo(id: number): void {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
