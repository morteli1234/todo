import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Header],
  template: `
    <app-header> </app-header>
    <main>
      <app-home> </app-home>
    </main>
  `,
  styles: [
    `
      main {
        padding-inline: 16px;
      }
    `,
  ],
})
export class App {
  protected readonly title = signal('first-ng-app');
}
