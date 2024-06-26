import {
  Component,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { injectQueryClient } from '@tanstack/angular-query-experimental';
import { TodosComponent } from './todos.component';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { TodoDetailsComponent } from './todo-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodosComponent, AngularQueryDevtools, TodoDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-query-sandbox';
  showTodos = signal(true);
  currentTodo = signal<string | null>(null);

  constructor() {
    console.log(injectQueryClient());
  }

  toggleShow() {
    this.showTodos.set(!this.showTodos());
  }

  openTodo(id: string) {
    this.currentTodo.set(id);
  }
}
