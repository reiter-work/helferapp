import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Comment} from "../shared/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private api = 'http://app.s1710456027.student.kwmhgb.at/api';


  constructor(private http: HttpClient) {
  }

  getComments(id) {
    return this.http.get(`${this.api}/comment/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  addComment(comment:Comment) {
    return this.http.post(`${this.api}/comment`, comment)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  private errorHandler(error: Error | any): Observable<any>{
    return throwError(error);
  }

}
