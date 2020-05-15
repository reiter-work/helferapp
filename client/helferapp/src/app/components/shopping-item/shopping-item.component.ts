import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {ShoppingItem} from "../../shared/shopping-item";
import {AuthService} from "../../servives/auth.service";
import {ShoppinglistService} from "../../servives/shoppinglist.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../shared/confirmation-dialog/confirmation-dialog.component";
import {InputDialogComponent} from "../shared/input-dialog/input-dialog.component";
import {DialogData} from "../shopping-list/shopping-list.component";


export interface ItemData {
  shoppingitem: ShoppingItem;
}

@Component({
  selector: 'bs-shopping-item',
  templateUrl: './shopping-item.component.html',
  styles: []
})


export class ShoppingItemComponent implements OnInit {

  @Input() public item: ShoppingItem;
  @Output() deleteItemEvent = new EventEmitter<ShoppingItem>();

  constructor(private as: AuthService, public ss: ShoppinglistService, private dialog: MatDialog) {
  }

  userIsHelper = this.as.isHelper();

  ngOnInit(): void {
  }

  //confirmDialog
  deleteItem(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Möchten Sie den Listeneintrag wirklich löschen?",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteItemEvent.emit(this.item);
      }
    });
  }

  toggleIsDone(item){
    let message = this.item.isDone ? 'Listeneintrag zurücksetzen?' : 'Listeneintrag als erledigt markieren?';

    if(!item.isDone){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data = {shoppingitem: this.item};

      const dialogRef = this.dialog.open(MarkItemAsDoneDialog, dialogConfig);
      dialogRef.afterClosed().subscribe(
        data => {
          if(data){
            this.item.price_payed = +data.price_payed;
            this.item.isDone = true;
            this.ss.updateItem(this.item).subscribe();
          }
        }
      );
    }
    else{
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: message,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.item.price_payed = null;
          this.item.isDone = false;
          this.ss.updateItem(this.item).subscribe(res => {
            this.item = res;
          });
        }
      });
    }


  }



  //editDialogwithInput
  editItem() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.item;

    const dialogRef = this.dialog.open(InputDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        this.item.title = data.title;
        this.item.amount = data.amount;
        this.item.price_max = data.price_max;
        this.ss.updateItem(this.item).subscribe();
      }
    );
  }
}

@Component({
  selector: 'mark-item-as-done-dialog',
  templateUrl: './mark-item-as-done-dialog.html',
})
export class MarkItemAsDoneDialog {

  constructor(
    public dialogRef: MatDialogRef<MarkItemAsDoneDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ItemData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
