import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private api = 'http://evernote24.s2110456009.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {}

  getSingle(id: string): Observable<Todo> {
    return this.http
      .get<Todo>(`${this.api}/todos/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  create(todo: Todo): Observable<any> {
    return this.http
      .post(`${this.api}/todos`, todo)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  update(todo: Todo): Observable<any> {
    return this.http
      .put(`${this.api}/todos/${todo.id}`, todo)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  remove(id: string) {
    return this.http
      .delete(`${this.api}/todos/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      })
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getAll(): Observable<Array<Todo>> {
    return this.http
      .get<Array<Todo>>(`${this.api}/todos`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
