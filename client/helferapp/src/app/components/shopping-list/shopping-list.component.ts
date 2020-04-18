import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Shoppinglist, ShoppingItem} from "../../shared/shoppinglist";
import {ShoppinglistService} from "../../servives/shoppinglist.service";

@Component({
  selector: 'bs-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: []
})
export class ShoppingListComponent implements OnInit {

  shoppinglists:Shoppinglist[];

  constructor(private ss: ShoppinglistService) { }

  @Output() showDetailsEvent = new EventEmitter<Shoppinglist>();

  ngOnInit() {
    this.ss.getShoppinglists().subscribe(
      res => {
        this.shoppinglists = res;
        console.log(this.shoppinglists)
      });
    //
  }

  showDetails(shoppinglist: Shoppinglist){
    console.log("Details!");
    this.showDetailsEvent.emit(shoppinglist);
  }

}
