import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { List_Basket_Item } from '../../../contracts/basket/list-basket-item';
import { BasketService } from '../../../services/common/models/basket.service';
import { Update_Basket_Item } from '../../../contracts/basket/update-basket-ıtem';
import { Create_basket_Items } from '../../../contracts/basket/create-basket-item';
import { OrderService } from '../../../services/common/models/order.service';
import { Create_order } from '../../../contracts/Order/create-order';
import { DialogService } from '../../../services/common/dialog.service';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from '../../../dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.scss',
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private basketService: BasketService,
    private orderService:OrderService,
    private dialogService:DialogService
  ) {
    super(spinner);
  }
  baseUrls: string = 'https://localhost:7040';
  baskets: List_Basket_Item[];

  async decrease(basketItemId: string, basketItemQuantity: number) {
    let _basketItem: Update_Basket_Item = new Update_Basket_Item();
    _basketItem.basketItemId = basketItemId;
    _basketItem.quantity = basketItemQuantity - 1;
    await this.basketService.put(_basketItem);
    this.listBasket();
  }
  async increase(basketItemId: string, basketItemQuantity: number) {
    let _basketItem: Update_Basket_Item = new Update_Basket_Item();
    _basketItem.basketItemId = basketItemId;
    _basketItem.quantity = basketItemQuantity + 1;

    await this.basketService.put(_basketItem);
    this.listBasket();
  }

   removeItem(basketItemId: string) {
    this.dialogService.openDialog({
      componentType:BasketItemRemoveDialogComponent,
      data:BasketItemDeleteState.Yes,
      afterClosed:async ()=>{
        await this.basketService.remove(basketItemId);
        this.listBasket();
      }
    })
    
  }
  async listBasket() {
    this.baskets = await this.basketService.get();
  }
 
  async ngOnInit() {
    this.listBasket();
  }
}
