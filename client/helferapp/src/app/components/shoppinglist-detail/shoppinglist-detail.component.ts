import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {ShoppingItem, Shoppinglist} from "../../shared/shoppinglist";
import {AuthService} from "../../servives/auth.service";
import {ShoppinglistService} from "../../servives/shoppinglist.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {InputDialogComponent} from "../shared/input-dialog/input-dialog.component";
import {ShoppingitemFactory} from "../../shared/shopping-item-factory";


export interface DialogData {
  item: ShoppingItem,
}

@Component({
  selector: 'bs-shoppinglist-detail',
  templateUrl: './shoppinglist-detail.component.html',
  styles: []
})
export class ShoppinglistDetailComponent implements OnInit {

  @Input()  shoppinglist: Shoppinglist;
  @Output() showListEvent = new EventEmitter<any>();

  constructor(private as:AuthService, public ss:ShoppinglistService,  public dialog: MatDialog) { }

  userIsHelper = this.as.isHelper();
  shoppingItem: ShoppingItem = ShoppingitemFactory.empty();

  ngOnInit(): void {
  }

  showShoppinglist(){
    this.showListEvent.emit();
  }

  deleteItem(item:ShoppingItem){
    this.ss.deleteItem(item.id).subscribe();
    this.shoppinglist.item = this.shoppinglist.item.filter(function(el) { return el.id != item.id; });
  }

  totalAmount(shoppinglist:Shoppinglist){

    let total = 0;
    for(let item of shoppinglist.item){
      if(item.price_payed) total += item.price_payed;
    }
    return total;

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InputDialogComponent, {
      data: {item: this.shoppingItem}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result.title || !!result.amount || !!result.price_max){
        result.shoppinglist_id = this.shoppinglist.id;
        this.shoppinglist.item.push(result);
        this.ss.addItem(result).subscribe();
      }

    });
  }


}
