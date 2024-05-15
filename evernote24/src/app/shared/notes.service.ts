import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  
  private api = 'http://evernote24.s2110456009.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  remove(id: string){
    return this.http.delete(`${this.api}/notes/${id}`)
    .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
