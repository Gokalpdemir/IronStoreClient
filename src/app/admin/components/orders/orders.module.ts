import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      // localthost/orders/$param
      // localthost/orders/add
      {path:"",component:OrdersComponent}
    ])
  ]
})
export class OrdersModule { }
