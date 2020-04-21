import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShoppingItem, Shoppinglist} from "../../shared/shoppinglist";
import {AuthService} from "../../servives/auth.service";
import {ShoppinglistService} from "../../servives/shoppinglist.service";

@Component({
  selector: 'bs-shoppinglist-detail',
  templateUrl: './shoppinglist-detail.component.html',
  styles: []
})
export class ShoppinglistDetailComponent implements OnInit {

  @Input()  shoppinglist: Shoppinglist;
  @Output() showListEvent = new EventEmitter<any>();

  constructor(private as:AuthService, public ss:ShoppinglistService) { }

  userIsHelper = this.as.isHelper();

  ngOnInit(): void {
  }

  showShoppinglist(){
    this.showListEvent.emit();
  }

  deleteItem(item:ShoppingItem){
    this.ss.deleteItem(item.id).subscribe();
    this.shoppinglist.item = this.shoppinglist.item.filter(function(el) { return el.id != item.id; });
  }

}
