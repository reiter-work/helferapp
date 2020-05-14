import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ShoppingItem, Shoppinglist} from "../../../shared/shoppinglist";

@Component({
  selector: 'bs-input-dialog',
  templateUrl: './input-dialog.component.html',
  styles: []
})
export class InputDialogComponent implements OnInit{

  form: FormGroup;
  title:String;
  price_max:number;
  amount:number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.title = data.title;
    this.price_max = data.price_max;
    this.amount = data.amount;

  }

  ngOnInit() {

      this.form = this.fb.group({
          title: [this.title],
          price_max: [this.price_max],
          amount: [this.amount],
      });



  }

  save() {
    if(this.form.errors){
    }
    else{
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }


}
