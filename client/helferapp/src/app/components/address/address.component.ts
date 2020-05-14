import {Component, Input, OnInit} from '@angular/core';
import {ShoppinglistService} from "../../servives/shoppinglist.service";
import {Shoppinglist} from "../../shared/shoppinglist";

@Component({
  selector: 'bs-address',
  templateUrl: './address.component.html',
  styles: []
})
export class AddressComponent implements OnInit {

  @Input() shoppinglist: Shoppinglist;

  constructor(public ss:ShoppinglistService) { }

  ngOnInit(): void {
  }

  renderAdress(){
    return this.shoppinglist.title;
  }

}
