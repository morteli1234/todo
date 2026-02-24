import { ChangeDetectorRef, Component, computed, effect, signal } from '@angular/core';
import { TodoModel } from '../../models/todo.models';
import { TodoItem } from '../todo-item/todo-item';
import { TodoForm } from '../todo-form/todo-form';
import { HttpclientService } from '../../services/httpclient/httpclient.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  imports: [TodoForm, TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList {
  // Signal
  filter = signal<'all' | 'active' | 'completed'>(this.getInitialFilter());
  todos = signal<TodoModel[]>([]);
  filteredTodos = computed(() => {
    const currentFilter = this.filter();
    const list = this.todos();

    if (currentFilter === 'active') return list.filter((t) => !t.completed);
    if (currentFilter === 'completed') return list.filter((t) => t.completed);
    return list;
  });
  // Effect
  private persistFilterEffect = effect(() => {
    localStorage.setItem('todo_filter', this.filter());
  });

  constructor(
    private httpclientService: HttpclientService,
    private cdr: ChangeDetectorRef,
  ) {}

  private todosSubscription?: Subscription;

  ngOnInit(): void {
    this.todosSubscription = this.httpclientService.todos$.subscribe((todos) => {
      this.todos.set(todos);
      this.cdr.detectChanges();
    });
    this.httpclientService.loadTodos();
  }

  ngOnDestroy(): void {
    this.todosSubscription?.unsubscribe();
  }

  addTodo(text: string): void {
    this.httpclientService.addTodo(text);
  }
  toggleTodo(id: number): void {
    this.httpclientService.toggleTodo(id);
  }

  updateTodo(event: { id: number; title: string }): void {
    this.httpclientService.updateTodo(event.id, event.title);
  }

  deleteTodo(id: number): void {
    this.httpclientService.deleteTodo(id);
  }

  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.filter.set(filter);
  }

  private getInitialFilter(): 'all' | 'active' | 'completed' {
    const saved = localStorage.getItem('todo_filter');
    if (saved === 'all' || saved === 'active' || saved === 'completed') return saved;
    return 'all';
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
