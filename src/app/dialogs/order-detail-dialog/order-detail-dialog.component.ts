import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../services/common/models/order.service';
import { Order } from '../../contracts/Order/order';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrl: './order-detail-dialog.component.scss',
})
export class OrderDetailDialogComponent
  extends BaseDialog<OrderDetailDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
    private orderService: OrderService
  ) {
    super(dialogRef);
  }

  async ngOnInit() {
    this.order = await this.orderService.getByIdOrder(this.data as string);
    console.log(this.order.basketItems)
    this.dataSource=this.order.basketItems
  }

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource=[] ;
  clickedRows = new Set<any>();
  order: Order;
}
export enum OrderDetailDialogState {
  Close,
  OrderCompleate,
}



