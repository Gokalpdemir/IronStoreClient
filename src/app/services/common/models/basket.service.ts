import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Basket_Item } from '../../../contracts/basket/list-basket-item';
import { Create_basket_Items } from '../../../contracts/basket/create-basket-item';
import { Update_Basket_Item } from '../../../contracts/basket/update-basket-ıtem';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(
   private httpClientService:HttpClientService
  ) { 
     
  }

  async get():Promise<List_Basket_Item[]>{
    const observable:Observable<List_Basket_Item[]>=this.httpClientService.get({
      contoller:"Baskets",
      action:"GetBasketItem"
    })
    const basketItem= await firstValueFrom(observable)
    return basketItem
  }

  async add(basketItem:Create_basket_Items,successCallback?:()=>void):Promise<void>{
      const observable:Observable<any>= this.httpClientService.post({
        contoller:"Baskets",
        action:"AddItemToBasket"
       },basketItem)
       await firstValueFrom(observable)
       successCallback();
  }

  async put(basketItem:Update_Basket_Item):Promise<void>{
        const observable:Observable<any>=this.httpClientService.put({
          contoller:"Baskets",
          action:"UpdateQuantity"
        },basketItem)

        await firstValueFrom(observable)
  }
  async remove(basketItemId:string):Promise<any>{
    const observable:Observable<any>=this.httpClientService.delete({
      contoller:"Baskets",
      action:"RemoveBasketItem"
    },basketItemId)
    await firstValueFrom(observable)

  }
}
