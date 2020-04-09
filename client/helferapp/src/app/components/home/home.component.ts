import { Component, OnInit } from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {Shoppinglist} from "../../shared/shoppinglist";

@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  listOn = true;
  detailOn = false;

  shoppinglist: Shoppinglist;

  constructor() { }

  ngOnInit(): void {
  }

  showList(){
    this.listOn = true;
    this.detailOn = false;
  }

  showDetail(shoppinglist: Shoppinglist){
    this.shoppinglist = shoppinglist;
    this.listOn = false;
    this.detailOn = true;
  }

  isLoggedIn(){
    return !!localStorage.getItem("token");


  }

}
