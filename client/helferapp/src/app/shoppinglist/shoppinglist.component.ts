import { Component, OnInit } from '@angular/core';
import {Item, Shoppinglist} from "../shared/shoppinglist";


@Component({
  selector: 'bs-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styles: []
})
export class ShoppinglistComponent implements OnInit {

  shoppinglists: Shoppinglist[];

  ngOnInit() {

    this.shoppinglists = [new Shoppinglist(1, "Test", new Date(), [])];

  }

}
