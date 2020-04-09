import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Shoppinglist, ShoppingItem} from "../../shared/shoppinglist";

@Component({
  selector: 'bs-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: []
})
export class ShoppingListComponent implements OnInit {

  shoppinglists:Shoppinglist[];

  constructor() { }

  @Output() showDetailsEvent = new EventEmitter<Shoppinglist>();

  ngOnInit(): void {



    this.shoppinglists = [

      new Shoppinglist(
        '1',
        'Testliste',
        new Date(),
        [new ShoppingItem(
          '1',
          'TestItem',
          2,
          1
        )],
      ),

      new Shoppinglist(
        '2',
        'Testliste2222',
        new Date(),
        [new ShoppingItem(
          '1',
          'TestItem',
          2,
          1
        )],
      ),

      new Shoppinglist(
        '3',
        'Testliste3333',
        new Date(),
        [new ShoppingItem(
          '1',
          'TestItem',
          2,
          1
        )],
      ),

    ]

  }

  showDetails(shoppinglist: Shoppinglist){
    console.log("Details!");
    this.showDetailsEvent.emit(shoppinglist);
  }

}
