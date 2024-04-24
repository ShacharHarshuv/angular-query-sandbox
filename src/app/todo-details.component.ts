import {
  Component,
  signal,
  input,
} from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { timeoutAsPromise } from './timeout-as-promise';

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [],
  template: `
    <h2>TODO: </h2>
    <p>
      @if (todoId() === null) {
        No todo selected
      } @else if (query.isPending()) {
        Loading...
      } @else if (query.isError()) {
        Error: {{ query.error().message }}
      } @else {
        {{ query.data() }}
      }
    </p>
  `,
  styles: ``
})
export class TodoDetailsComponent {
  todoId = input<string | null>(null);

  query = injectQuery(() => ({
    enabled: !!this.todoId(),
    queryKey: ['todo', this.todoId()],
    queryFn: () => timeoutAsPromise(1000, this.todoId()),
  }));
}
