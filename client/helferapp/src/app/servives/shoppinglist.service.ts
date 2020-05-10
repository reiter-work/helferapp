import { Injectable } from '@angular/core';
import {ShoppingItem, Shoppinglist} from "../shared/shoppinglist";
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class ShoppinglistService {

  private api = 'http://app.s1710456027.student.kwmhgb.at/api';


  constructor(private http: HttpClient) {
  }

  getShoppinglists() {
    return this.http.get(`${this.api}/shoppinglist/user`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateShoppinglist(id:string){
    return this.http.delete(`${this.api}/shoppinglist/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createShoppinglist(data:any) : Observable<Shoppinglist>{
    return this.http.post(`${this.api}/shoppinglist`, data)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deleteItem(id:string){
    return this.http.delete(`${this.api}/shoppinglist/deleteItem/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateItem(item:ShoppingItem){
    return this.http.put(`${this.api}/shoppinglist/item`, item)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  addItem(item:ShoppingItem){
    return this.http.post(`${this.api}/shoppinglist/item`, item)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any>{
    return throwError(error);
  }


}
