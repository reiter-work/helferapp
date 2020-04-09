import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Shoppinglist} from "../../shared/shoppinglist";

@Component({
  selector: 'bs-shoppinglist-detail',
  templateUrl: './shoppinglist-detail.component.html',
  styles: []
})
export class ShoppinglistDetailComponent implements OnInit {

  @Input()  shoppinglist: Shoppinglist;
  @Output() showListEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  showShoppinglist(){
    this.showListEvent.emit();
  }

}
