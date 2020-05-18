import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Shoppinglist, ShoppingItem} from "../../shared/shoppinglist";
import {ShoppinglistService} from "../../servives/shoppinglist.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../servives/auth.service";
import {ShoppinglistFactory} from "../../shared/shoppinglist-factory";
import {ConfirmationDialogComponent} from "../shared/confirmation-dialog/confirmation-dialog.component";

export interface DialogData {
  shoppinglist: Shoppinglist;
}

@Component({
  selector: 'bs-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: []
})
export class ShoppingListComponent implements OnInit {

  shoppinglists: Shoppinglist[] = [];
  claimedLists: Shoppinglist[] = [];
  tobeClaimedLists: Shoppinglist[] = [];
  shoppinglist: Shoppinglist = ShoppinglistFactory.empty();
  isHelper:boolean;

  constructor(private ss: ShoppinglistService, private as: AuthService, public dialog: MatDialog) { }

  @Output() showDetailsEvent = new EventEmitter<Shoppinglist>();

  ngOnInit() {
    this.isHelper = this.as.isHelper();
    this.shoppinglist.user_id = this.as.getCurrentUserId();

    if(!this.isHelper){
      this.ss.getShoppinglists().subscribe(
        res => {
          for(let shoppinglist of res){
            this.shoppinglists.push(ShoppinglistFactory.fromObject(shoppinglist));
          }
        });
    }
    if(this.isHelper){
      this.ss.getClaimedLists().subscribe(res => {
        for(let shoppinglist of res){
          this.claimedLists.push(ShoppinglistFactory.fromObject(shoppinglist));
        }
      });
      this.ss.getListsToClaim().subscribe(res =>{
        for(let shoppinglist of res){
          this.tobeClaimedLists.push(ShoppinglistFactory.fromObject(shoppinglist));
        }
      })
    }
  }

  showDetails(shoppinglist: Shoppinglist){
    this.showDetailsEvent.emit(shoppinglist);
  }

  editList(shoppinglist:Shoppinglist) {
    const dialogRef = this.dialog.open(AddShoppinglistDialog, {
      data: {shoppinglist: shoppinglist}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result.title || !!result.dueDate){
       this.ss.updateShoppinglist(result).subscribe();
      }
    });

  }

  deleteList(id: string){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Möchten Sie den Listeneintrag wirklich löschen?",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ss.deleteList(id).subscribe();
        this.shoppinglists = this.shoppinglists.filter(function(el) { return el.id != id; });
      }
    });
  }

  itemsDone(shoppinglist){
    let itemsDone = 0;
    if(shoppinglist.item){
      for(let item of shoppinglist.item){
        item.isDone ? itemsDone++ : "";
      }
    }
    return itemsDone;
  }

  claimList(shoppinglist){

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Möchten Sie diesen Einkaufübernehmen?",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        shoppinglist.helper_id = this.as.getCurrentUserId();
        this.ss.claimList(shoppinglist).subscribe();
        this.claimedLists.push(shoppinglist);
        this.tobeClaimedLists = this.tobeClaimedLists.filter(function(el) { return el.id != shoppinglist.id; });
      }
    });




  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddShoppinglistDialog, {
      data: {shoppinglist: this.shoppinglist}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result.title || !!result.dueDate){
        //crazy Dateobject shit. WTF???
        this.ss.createShoppinglist(result).subscribe(res => {
          let list = ShoppinglistFactory.fromObject(res);
          list.dueDate = result.dueDate;
          this.shoppinglists.push(list);
          this.shoppinglist = ShoppinglistFactory.empty();
        });
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
