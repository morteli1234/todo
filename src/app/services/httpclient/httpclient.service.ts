import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TodoModel } from '../../models/todo.models';

@Injectable({
  providedIn: 'root',
})
export class HttpclientService {
  //constructor(private http: HttpClient) {}
  http = inject(HttpClient);

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
