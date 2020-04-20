import {Component, Input, OnInit} from '@angular/core';
import {ShoppingItem} from "../../shared/shopping-item";

@Component({
  selector: 'bs-shopping-item',
  templateUrl: './shopping-item.component.html',
  styles: []
})
export class ShoppingItemComponent implements OnInit {

  @Input() public item: ShoppingItem;

  constructor() { }

  ngOnInit(): void {
  }

}
