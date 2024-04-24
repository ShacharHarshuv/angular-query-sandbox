import {
  Component,
  Injectable,
  inject,
  output,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
  queryOptions,
} from '@tanstack/angular-query-experimental';
import { timeoutAsPromise } from './timeout-as-promise';

let serverState: Todo[] = [
  { id: '1', title: 'Do Laundry' },
  { id: '2', title: 'Walk Dog' },
];

export const todosQueryOptions = () => queryOptions({
  queryKey: ['todos'],
  queryFn: () => timeoutAsPromise(1000, serverState),
});

@Component({
  selector: 'app-todos',
  standalone: true,
  template: `
    <div>
      <button
        (click)="onAddTodo()"
        [disabled]="query.isFetching() || mutation.isPending()"
      >
        Add Todo
      </button>
      
      @if (query.isPending()) {
        <div>Loading...</div>
      } @else if (query.isError()) {
        <div>Error: {{ query.error().message }}</div>
      } @else {
        <ul>
          @for (todo of query.data(); track todo.title) {
            <li (click)="openTodo(todo.id)">{{ todo.title }}</li>
          }
        </ul>
      }
    </div>
  `,
})
export class TodosComponent {
  todoOpen = output<string>();

  queryClient = injectQueryClient();
  query = injectQuery(todosQueryOptions);
  mutation = injectMutation((client) => ({
    mutationFn: (todo: Todo) => {
      serverState = [...serverState, todo];
      return timeoutAsPromise(1000, todo);
    },
    onSuccess: () => {
      // Invalidate and refetch by using the client directly
      client.invalidateQueries({ queryKey: ['todos'] });
      // OR use the queryClient that is injected into the component
      // this.queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  }));

  onAddTodo() {
    this.mutation.mutate({
      id: Date.now().toString(),
      title: 'Do Laundry',
    });
  }

  openTodo(id: string) {
    this.todoOpen.emit(id);
  }
}

export interface Todo {
  id: string;
  title: string;
}
