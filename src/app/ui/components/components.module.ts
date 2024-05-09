import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { BasketsModule } from './baskets/baskets.module';
import { HomeModule } from './home/home.module';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { DenemeModule } from './deneme/deneme.module';
import { UpdatePasswordModule } from './update-password/update-password.module';





@NgModule({
  declarations: [
    
  
   
  
    
  
    
  
    
  ],
  imports: [
    CommonModule,
    ProductsModule,
    BasketsModule,
    HomeModule,
    RegisterModule,
    ProductDetailModule,
    PasswordResetModule,
    UpdatePasswordModule
   
  ],
})
export class ComponentsModule { }
