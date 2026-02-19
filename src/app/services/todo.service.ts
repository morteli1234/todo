import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

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
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  // constructor(private http: HttpClient) {}

  private todos: Todo[] = [
    { id: 1, text: 'Learn Angular', completed: false },
    { id: 2, text: 'Build Todo List', completed: true },
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

  getTodos(): Todo[] {
    return [...this.todos];
  }
  addTodo(text: string): void {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: trimmedText,
      completed: false,
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
