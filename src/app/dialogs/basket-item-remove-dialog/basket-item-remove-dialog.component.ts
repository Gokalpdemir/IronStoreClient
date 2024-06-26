import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteState } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-basket-item-remove-dialog',
  templateUrl: './basket-item-remove-dialog.component.html',
  styleUrl: './basket-item-remove-dialog.component.scss'
})
export class BasketItemRemoveDialogComponent extends BaseDialog<BasketItemRemoveDialogComponent> {
   constructor(
    dialogRef:MatDialogRef<BasketItemRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:BasketItemDeleteState
  ){
    super(dialogRef)
   }
}
export enum BasketItemDeleteState{
  Yes,
  No
}