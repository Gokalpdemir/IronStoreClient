import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/common/models/product.service';
import { ActivatedRoute } from '@angular/router';
import { List_Product } from '../../../contracts/list_product';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../../base/base.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
   constructor(
    private productService:ProductService,
    private activatedRoute: ActivatedRoute,
    private spinnerService:NgxSpinnerService
   ){
        
   }
   productId:string
   product:List_Product
   baseUrls: string = 'https://localhost:7040';
   imagePaths:string[]
   arttır(){
    
   }
   async getProductDetail(){
     this.spinnerService.show(SpinnerType.BallSpinFade)
      this.activatedRoute.params.subscribe(async (params)=>{
        this.productId=params["productId"]
      })
      this.product = await this.productService.getProduct(this.productId,()=>this.spinnerService.hide(SpinnerType.BallSpinFade))
      console.log(this.product)
      
    }
    
   ngOnInit(): void {
     this.getProductDetail()
   }
}
