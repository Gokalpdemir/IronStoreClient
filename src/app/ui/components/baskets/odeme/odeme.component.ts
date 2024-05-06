import { Component } from '@angular/core';
import { OrderService } from '../../../../services/common/models/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { Create_order } from '../../../../contracts/Order/create-order';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../../../services/ui/custom-toastr.service';
import { Router } from '@angular/router';
import { DialogService } from '../../../../services/common/dialog.service';
import {
  CompleateShoppingDialogComponent,
  CompleateShoppingState,
} from '../../../../dialogs/compleate-shopping-dialog/compleate-shopping-dialog.component';

@Component({
  selector: 'app-odeme',
  templateUrl: './odeme.component.html',
  styleUrl: './odeme.component.scss',
})
export class OdemeComponent extends BaseComponent {
  constructor(
    spinner: NgxSpinnerService,
    private orderService: OrderService,
    private toasterService: CustomToastrService,
    private router: Router,
    private dialogService: DialogService
  ) {
    super(spinner);
  }
  completeShopping() {
    this.dialogService.openDialog({
      data: CompleateShoppingState.Yes,
      componentType: CompleateShoppingDialogComponent,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallSpinFade);
        let createOrder: Create_order = new Create_order();
        createOrder.address =
          'Yavuz Sultan Selim Mahallesi Kadışeşme Sokak no:23 daire:3';
        createOrder.description = 'Çabuk gelsin';
        await this.orderService.create(createOrder, () =>
          this.hideSpinner(SpinnerType.BallSpinFade)
        );
        this.toasterService.message(
          'Sipariş Alınmıştır!!',
          'Sipariş Olluşturuldu',
          {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopRight,
          }
        );
        this.router.navigate(['/']);
      },
    });
  }
}
