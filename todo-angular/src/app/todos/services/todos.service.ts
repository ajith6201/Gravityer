import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<any[]>('assets/todos.json').pipe(
      map(data =>
        data.map<Todo>(x => ({
          id: x.id,
          text: x.text,
          creationDate: new Date(x.creationDate),
          completed: x.completed,
        })),
      ),
    );
  }

  // Method to create a new todo
  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>('assets/todos.json', todo);
  }
}
