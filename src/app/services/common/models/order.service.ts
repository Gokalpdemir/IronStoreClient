import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_order } from '../../../contracts/Order/create-order';
import { Observable, firstValueFrom, observable } from 'rxjs';
import { List_Order } from '../../../contracts/Order/list-order';
import { observeNotification } from 'rxjs/internal/Notification';
import { Order } from '../../../contracts/Order/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClientService: HttpClientService) {}

  async create(order: Create_order, successCallBack?: () => void) {
    const observable: Observable<any> = await this.httpClientService.post(
      {
        contoller: 'Orders',
        action: 'CreateOrder',
      },
      order
    );
    await firstValueFrom(observable);
    successCallBack();
  }

  async getAllOrder(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{ totalOrderCount: number; orders: List_Order[] }> {
    const observable: Observable<{
      totalOrderCount: number;
      orders: List_Order[];
    }> = this.httpClientService.get({
      contoller: 'Orders',
      action: 'GetAll',
      queryString: `page=${page}&size=${size}`,
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error));

    return await promiseData;
  }

 async getByIdOrder( orderId :string,successCallBack?: () => void,
  errorCallBack?: (errorMessage: string) => void):Promise<Order>{
    const observable:Observable<Order>= this.httpClientService.get({
      contoller:"Orders",
    },orderId)  
    const promiseData=firstValueFrom(observable);
    promiseData.then(value=>successCallBack())
    .catch(err=> errorCallBack(err));
    return await promiseData;
  }
  
  async comppleteOrder(orderId:string){
    const observable:Observable<any>= this.httpClientService.get({
      contoller:"Orders",
      action:"complete-order"
    },orderId)

    await firstValueFrom(observable);
  }
   
}
