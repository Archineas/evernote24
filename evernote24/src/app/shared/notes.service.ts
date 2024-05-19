import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Note } from './note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private api = 'http://evernote24.s2110456009.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {}

  getSingle(id: string) {
    return this.http
      .get<Note>(`${this.api}/notes/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  remove(id: string) {
    return this.http
      .delete(`${this.api}/notes/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      })
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  create(note: Note): Observable<any> {
    console.log(note);
    return this.http
      .post(`${this.api}/notes`, note, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      })
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  update(note: Note): Observable<any> {
    return this.http
      .put(`${this.api}/notes/${note.id}`, note)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
