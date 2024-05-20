import { Injectable } from '@angular/core';
import { Note, Notelist, Todo, User, Image } from '../shared/notelist';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EvernotelistsService {
  private api = 'http://evernote24.s2110456009.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Notelist>> {
    return this.http
      .get<Array<Notelist>>(`${this.api}/notelists`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getSingle(id: string) {
    return this.http
      .get<Notelist>(`${this.api}/notelists/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  remove(id: string) {
    return this.http
      .delete(`${this.api}/notelists/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      })
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  create(notelist: Notelist): Observable<any> {
    return this.http
      .post(`${this.api}/notelists`, notelist, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      })
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  update(notelist: Notelist): Observable<any> {
    return this.http
      .put(`${this.api}/notelists/${notelist.id}`, notelist, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      })
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
