import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Shoppinglist, ShoppingItem} from "../../shared/shoppinglist";
import {ShoppinglistService} from "../../servives/shoppinglist.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../servives/auth.service";

export interface DialogData {
  title: string;
  user_id:number;
  dueDate:Date;
}


@Component({
  selector: 'bs-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: []
})
export class ShoppingListComponent implements OnInit {

  shoppinglists: Shoppinglist[];
  title: string;
  user_id: number;
  dueDate: Date;

  constructor(private ss: ShoppinglistService, private as: AuthService, public dialog: MatDialog) { }

  @Output() showDetailsEvent = new EventEmitter<Shoppinglist>();

  ngOnInit() {

    this.user_id = this.as.getCurrentUserId();

    this.ss.getShoppinglists().subscribe(
      res => {
        this.shoppinglists = res;
      });
    //
  }

  showDetails(shoppinglist: Shoppinglist){
    console.log("Details!");
    this.showDetailsEvent.emit(shoppinglist);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddShoppinglistDialog, {
      data: {title: this.title, user_id: this.user_id, dueDate: this.dueDate}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result.title || !!result.dueDate){
        result.item = [];
        this.shoppinglists.push(result);
        this.ss.createShoppinglist(result).subscribe();
        this.title ="";
      }

    });
  }


}

@Component({
  selector: 'add-shoppinglist-dialog',
  templateUrl: './add-shoppinglist-dialog.html',
})
export class AddShoppinglistDialog {

  constructor(
    public dialogRef: MatDialogRef<AddShoppinglistDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
