import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_order } from '../../../contracts/Order/create-order';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClientService:HttpClientService
  ) { }

 async create(order:Create_order ,successCallBack?:()=>void){
  const observable:Observable<any>= await this.httpClientService.post({
      contoller:"Orders",
      action:"CreateOrder",

    },order)
    await firstValueFrom(observable);
    successCallBack();
  }
}
