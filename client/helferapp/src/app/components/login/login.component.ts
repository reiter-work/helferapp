import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../servives/auth.service";



interface Response {
  response: string;
  result: {
    token:string;
  }
}

@Component({
  selector: 'bs-login',
  templateUrl: './login.component.html',
  styles: []
})

export class LoginComponent implements OnInit {



  loginForm:FormGroup;

  constructor(private fb:FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });


  }

  login(){
    const val = this.loginForm.value;
    if(val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe(res => {
        const resObj = res as Response;
        if(resObj.response === "success"){
          this.authService.setLocalStorage(resObj.result.token);
        }
      })
    }
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  logout(){
    this.authService.logout();
  }

}
