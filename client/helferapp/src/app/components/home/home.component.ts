import { Component, OnInit } from '@angular/core';
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isLoggedIn(){
    return !!localStorage.getItem("token");


  }

}
