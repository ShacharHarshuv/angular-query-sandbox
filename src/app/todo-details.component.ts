import {
  Component,
  input,
} from '@angular/core';
import {
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { timeoutAsPromise } from './timeout-as-promise';
import { Todo } from './todos.component';

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
        Error: {{ query.error()?.message }}
      } @else {
        {{ query.data() }}
      }
    </p>
  `,
  styles: ``,
})
export class TodoDetailsComponent {
  readonly queryClient = injectQueryClient();
  readonly todoId = input<string | null>(null);

  query = injectQuery(() => ({
    enabled: !!this.todoId(),
    queryKey: ['todo', this.todoId()],
    queryFn: () => {
      console.log('fetch todo details');
      return timeoutAsPromise(1000, this.todoId())
    },
    initialData: () => {
      return this.queryClient.getQueryData<Todo[]>(['todos'])
        ?.find((d) => d.id === this.todoId())?.title + ' Details';
    },
  }));
}
