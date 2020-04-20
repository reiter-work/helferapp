import {Injectable} from '@angular/core';
import {isNullOrUndefined, log} from "util";
import {HttpClient} from "@angular/common/http";
import * as decode from 'jwt-decode';
import {retry} from 'rxjs/operators';

//npm install --save-dev jwt-decode

interface User {
  result: {
    created_at: Date,
    email: string,
    id: number,
    name: string,
    updated_at: Date
  }
}

@Injectable()
export class AuthService {

  private api:string = 'http://app.s1710456027.student.kwmhgb.at/api/auth';

  constructor(private http: HttpClient) {  }

  login(email: string, password: string ) {
    return this.http.post(`${this.api}/login`, {"email": email, "password": password});
  }

  public setCurrentUserId(){
    this.http.get<User>(`${this.api}/user`).pipe(retry(3)).subscribe(res =>{
        localStorage.setItem('userId', res.result.id.toString());
      }
    );
  }

  public getCurrentUserId(){
    return Number.parseInt(localStorage.getItem('userId'));
  }

  public setLocalStorage(token: string) {
    const decodedToken = decode(token);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', decodedToken.user.id);
    localStorage.setItem('isHelper', decodedToken.user.isHelper);
    localStorage.setItem('username', decodedToken.user.username);
  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isHelper");
    localStorage.removeItem("username");
    console.log("logged out");
  }

  public isLoggedIn() {
    return !isNullOrUndefined(localStorage.getItem("token"));
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

}
