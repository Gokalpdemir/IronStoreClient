import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { Product } from '../../../contracts/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent implements OnInit {
 constructor(spinner:NgxSpinnerService,private httpClientService:HttpClientService){
  super(spinner);

 }
ngOnInit(): void {
  this.showSpinner(SpinnerType.SquareSpin);
  this.httpClientService
    .get<Product>(
      {
        contoller: 'Products',
        action:"getall"
      },
      
    )
    .subscribe((data) => console.log(data));

  // this.httpClientService.post({
  //   contoller:"Products",
  //   action:"add"
  // },{
  //   name:"kalem",
  //   stock:10,
  //   price:15,
  // }).subscribe(data=>console.log(data))

  // this.httpClientService.post({
  //   contoller:"Products",
  //   action:"add"
  // },{
  //   name:"kağıt",
  //   stock:100,
  //   price:5,
  // }).subscribe(data=>console.log(data))

  // this.httpClientService.post({
  //   contoller:"Products",
  //   action:"add"
  // },{
  //   name:"silgi",
  //   stock:1000,
  //   price:3,
  // }).subscribe(data=>console.log(data))
  // this.httpClientService.put({
  //   contoller:"Products",
  //   action:"update"
  // },{
  //   id:"fa62f743-8cf2-473b-8661-023af2c83165",
  //   name:"tstUpdateProductClient",
  //   stock:5,
  //   price:3

  // }
  // ).subscribe(data=>console.log(data))

  // this.httpClientService.delete(
  //   { contoller: 'Products' },
  //   'fa62f743-8cf2-473b-8661-023af2c83165'
  // ).subscribe();
  // this.httpClientService.get({fullEndPoint:"https://jsonplaceholder.typicode.com/posts"}).subscribe(data=>console.log(data))
} 
}
