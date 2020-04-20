import {Component, Input, OnInit} from '@angular/core';
import {Shoppinglist} from "../../shared/shoppinglist";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'bs-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.css']
})


export class GreetingComponent implements OnInit {

  @Input() public isloggedin:boolean;
  public username:string;

  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.username;
  }

}
