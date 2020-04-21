import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShoppingItem} from "../../shared/shopping-item";
import {AuthService} from "../../servives/auth.service";
import {ShoppinglistService} from "../../servives/shoppinglist.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../shared/confirmation-dialog/confirmation-dialog.component";
import {InputDialogComponent} from "../shared/input-dialog/input-dialog.component";

@Component({
  selector: 'bs-shopping-item',
  templateUrl: './shopping-item.component.html',
  styles: []
})



export class ShoppingItemComponent implements OnInit {

  @Input() public item: ShoppingItem;
  @Output() deleteItemEvent = new EventEmitter<ShoppingItem>();

  constructor(private as: AuthService, private ss: ShoppinglistService, private dialog: MatDialog ) {
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

  //editDialogwithInput
  editItem(){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    dialogConfig.data = this.item;

    const dialogRef = this.dialog.open(InputDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => this.ss.updateItem(data.id, data)
    );
  }
}
