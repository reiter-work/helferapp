import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {ShoppingItem, Shoppinglist} from "../../shared/shoppinglist";
import {AuthService} from "../../servives/auth.service";
import {ShoppinglistService} from "../../servives/shoppinglist.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface ItemData {
  title: string;
  user_id:number;
  dueDate:Date;
}

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

@Component({
  selector: 'add-item-dialog',
  templateUrl: './add-item-dialog.html',
})
export class AddItemDialog {

  constructor(
    public dialogRef: MatDialogRef<AddItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ItemData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
