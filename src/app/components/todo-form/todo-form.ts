import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.scss',
})
export class TodoForm {
  @Output() add = new EventEmitter<string>();

  todoForm = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  onSubmit(): void {
    if (this.todoForm.invalid) return;

    const value = this.todoForm.controls.title.value.trim();
    if (!value) return;

    this.add.emit(value);
    this.todoForm.reset({ title: '' });
  }
}
