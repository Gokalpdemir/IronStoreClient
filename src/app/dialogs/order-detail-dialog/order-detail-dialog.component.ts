import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../services/common/models/order.service';
import { Order } from '../../contracts/Order/order';
import { DialogService } from '../../services/common/dialog.service';
import {
  CompleateOrderState,
  CompleteOrderDialogComponent,
} from '../complete-order-dialog/complete-order-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';

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
    private orderService: OrderService,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService,

    private toastrService:CustomToastrService
  ) {
    super(dialogRef);
  }

  async ngOnInit() {
    this.order = await this.orderService.getByIdOrder(this.data as string);
    console.log(this.order);
    this.dataSource = this.order.basketItems;
  }
  completeOrder(orderId: string) {
    this.dialogService.openDialog({
      componentType: CompleteOrderDialogComponent,
      data: CompleateOrderState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallSpinFade);
        await this.orderService.comppleteOrder(orderId);
        this.spinner.hide(SpinnerType.BallSpinFade);
        this.toastrService.message("Sipariş başarıyla tamamlanmıştır,Müşteriye mail gönderildi ","Sipariş tamamlandı!",{
          messageType:ToastrMessageType.Info,
          position:ToastrPosition.TopLeft
        })
        
      },
    });
  }

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  order: Order;
}
export enum OrderDetailDialogState {
  Close,
  OrderCompleate,
}
