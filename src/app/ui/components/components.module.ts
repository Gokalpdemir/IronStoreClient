import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { BasketsModule } from './baskets/baskets.module';
import { HomeModule } from './home/home.module';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailModule } from './product-detail/product-detail.module';



@NgModule({
  declarations: [
    
  
   
  ],
  imports: [
    CommonModule,
    ProductsModule,
    BasketsModule,
    HomeModule,
    RegisterModule,
    ProductDetailModule
  ],
})
export class ComponentsModule { }
