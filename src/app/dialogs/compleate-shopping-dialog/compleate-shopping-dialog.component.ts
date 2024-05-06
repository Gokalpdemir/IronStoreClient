import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-compleate-shopping-dialog',
  templateUrl: './compleate-shopping-dialog.component.html',
  styleUrl: './compleate-shopping-dialog.component.scss'
})
export class CompleateShoppingDialogComponent extends BaseDialog<CompleateShoppingDialogComponent> {
constructor(dialogRef:MatDialogRef<CompleateShoppingDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data:CompleateShoppingState
){
   super(dialogRef)
}
}

export enum CompleateShoppingState{
  Yes,
  No
}