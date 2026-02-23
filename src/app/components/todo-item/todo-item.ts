import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
  host: { tabindex: '0' },
})
export class TodoItem {
  @Input() todo!: { id: number; title: string; completed: boolean; userId: number };

  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<{ id: number; title: string }>();
  @ViewChild('titleInput') titleInput?: ElementRef<HTMLInputElement>;

  private bodyClickListener: (() => void) | null = null;

  constructor(
    private renderer: Renderer2,
    private hostElement: ElementRef<HTMLElement>,
  ) {}
  onTitleInputFocus(): void {
    if (this.bodyClickListener) return;

    this.bodyClickListener = this.renderer.listen('document', 'mousedown', (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (this.hostElement.nativeElement.contains(target)) return;

      const latestTitle = this.titleInput?.nativeElement.value ?? this.todo.title;
      this.emitUpdateTodo(this.todo.id, latestTitle);
      this.stopBodyClickListener();
    });
  }

  onTitleInputBlur(): void {
    setTimeout(() => this.stopBodyClickListener(), 0);
  }

  private stopBodyClickListener(): void {
    if (!this.bodyClickListener) return;
    this.bodyClickListener();
    this.bodyClickListener = null;
  }

  ngOnDestroy(): void {
    this.stopBodyClickListener();
  }

  // Focus the host element when clicked to enable keyboard interactions
  @HostListener('click', ['$event'])
  onHostClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (target?.closest('input, textarea, button, select, a, [contenteditable="true"]')) {
      return;
    }

    const host = event.currentTarget as HTMLElement | null;
    host?.focus();
  }
  // Listen for Enter key to toggle completion status
  @HostListener('keydown.enter')
  onEnterPressed(): void {
    this.toggle.emit(this.todo.id);
  }

  emitToggleTodo(id: number): void {
    this.toggle.emit(this.todo.id);
  }

  emitDeleteTodo(id: number): void {
    this.delete.emit(this.todo.id);
  }

  emitUpdateTodo(id: number, title: string): void {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    console.log('Update emitted from item:', { id, title: trimmedTitle });
    this.update.emit({ id, title: trimmedTitle });
  }
}
