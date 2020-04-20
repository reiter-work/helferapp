import {Component, Input, OnInit} from '@angular/core';
import {Shoppinglist} from "../../shared/shoppinglist";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'bs-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.css']
})


export class GreetingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  getUsername(){
    return localStorage.getItem("username");
  }

  isLoggedIn(){
    return !!localStorage.getItem("token")
  }
}
