import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TodoModel } from '../../models/todo.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpclientService {
  //constructor(private http: HttpClient) {}
  http = inject(HttpClient);

  private todosSubject = new BehaviorSubject<TodoModel[]>([]);
  todos$ = this.todosSubject.asObservable();
  // BehaviourSubject methods
  loadTodos(): void {
    this.http
      .get<TodoModel[]>(`${environment.apiBaseUrl}/todos?_limit=10`)
      .subscribe((todos) => this.todosSubject.next(todos));
  }

  addTodo(title: string): void {
    const payload = { title, completed: false, userId: 1 };
    this.http.post<TodoModel>(`${environment.apiBaseUrl}/todos`, payload).subscribe((created) => {
      const current = this.todosSubject.value;
      this.todosSubject.next([...current, { ...created, id: Date.now() }]);
    });
  }

  toggleTodo(id: number): void {
    const current = this.todosSubject.value;
    const todo = current.find((t) => t.id === id);
    if (!todo) return;

    this.http
      .put(`${environment.apiBaseUrl}/todos/${id}`, { completed: !todo.completed })
      .subscribe(() => {
        this.todosSubject.next(
          current.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
        );
      });
  }

  updateTodo(id: number, title: string): void {
    const trimmed = title.trim();
    if (!trimmed) return;

    this.http.put(`${environment.apiBaseUrl}/todos/${id}`, { title: trimmed }).subscribe(() => {
      this.todosSubject.next(
        this.todosSubject.value.map((t) => (t.id === id ? { ...t, title: trimmed } : t)),
      );
    });
  }

  deleteTodo(id: number): void {
    this.http.delete(`${environment.apiBaseUrl}/todos/${id}`).subscribe(() => {
      this.todosSubject.next(this.todosSubject.value.filter((t) => t.id !== id));
    });
  }
  //GET
  getTodoFromApi() {
    return this.http.get<Array<TodoModel>>(`${environment.apiBaseUrl}/todos?_limit=10`);
  }
  // PUT
  updateData(id: number, data: any) {
    return this.http.put(`${environment.apiBaseUrl}/todos/${id}`, data);
  }

  // POST
  createData(data: { title: string; completed: boolean; userId: number }) {
    return this.http.post<{ id: number; title: string; completed: boolean; userId: number }>(
      `${environment.apiBaseUrl}/todos`,
      data,
    );
  }
  // toggleTodo(id: number): void {
  //   this.todos = this.todos.map((todo) =>
  //     todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  //   );
  // }
  // DELETE
  deleteData(id: number) {
    return this.http.delete(`${environment.apiBaseUrl}/todos/${id}`);
  }
}
