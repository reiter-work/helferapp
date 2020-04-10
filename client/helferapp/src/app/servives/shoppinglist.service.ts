import { Injectable } from '@angular/core';
import {ShoppingItem, Shoppinglist} from "../shared/shoppinglist";
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable()

export class ShoppinglistService {

  private api = 'http://app.s1710456027.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  getShoppinglistByUser(userId:number): Observable<Array<Shoppinglist>>{
    return this.http.get(`${this.api}/shoppinglist/user/${userId}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  private errorHandler(error: Error | any): Observable<any>{
    return throwError(error);
  }
}
