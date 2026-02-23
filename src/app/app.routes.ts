import { Routes } from '@angular/router';
import { Home } from './home/home';
import { TodoList } from './components/todo-list/todo-list';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'todos', component: TodoList },
  { path: '**', redirectTo: '' },
];
