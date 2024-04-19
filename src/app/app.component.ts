import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { injectQueryClient } from '@tanstack/angular-query-experimental';
import { TodosComponent } from './todos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-query-sandbox';

  constructor() {
    console.log(injectQueryClient());
  }
}
