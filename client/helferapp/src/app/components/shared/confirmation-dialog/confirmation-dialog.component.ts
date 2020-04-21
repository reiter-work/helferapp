import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'bs-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styles: []
})
export class ConfirmationDialogComponent {

  constructor( public dialogRef: MatDialogRef<ConfirmationDialogComponent>,  @Inject(MAT_DIALOG_DATA) public message: string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
