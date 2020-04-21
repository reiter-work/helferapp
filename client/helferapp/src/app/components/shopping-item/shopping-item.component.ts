import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShoppingItem} from "../../shared/shopping-item";
import {AuthService} from "../../servives/auth.service";
import {ShoppinglistService} from "../../servives/shoppinglist.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../shared/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'bs-shopping-item',
  templateUrl: './shopping-item.component.html',
  styles: []
})



export class ShoppingItemComponent implements OnInit {

  @Input() public item: ShoppingItem;
  @Output() deleteItemEvent = new EventEmitter<ShoppingItem>();

  constructor(private as: AuthService, private ss: ShoppinglistService, public dialog: MatDialog) {
  }

  userIsHelper = this.as.isHelper();

  ngOnInit(): void {
  }

  openDialog(): void {
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
}
