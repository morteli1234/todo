import { Component } from '@angular/core';
import { TodoList } from '../components/todo-list/todo-list';

@Component({
  selector: 'app-home',
  imports: [TodoList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
