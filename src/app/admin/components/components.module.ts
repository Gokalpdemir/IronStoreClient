import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RouterModule } from '@angular/router';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';



@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    CustomersModule,
    ProductsModule,
    OrdersModule,
    DashboardModule,
    RouterModule,
    AuthorizeMenuModule,
    RoleModule,
    UserModule

  ]
})
export class ComponentsModule { }