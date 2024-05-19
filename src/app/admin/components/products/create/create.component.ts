import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { Create_Product } from '../../../../contracts/create_product';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';
import { CategoryService } from '../../../../services/common/models/category.service';
import { List_Category } from '../../../../contracts/Category/list-category';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent implements OnInit {
constructor(private productService:ProductService,spinner:NgxSpinnerService,private alertify:AlertifyService,private categoryService:CategoryService){
  super(spinner)
}
categories: List_Category[] ;

async ngOnInit() {
   this.categories= await this.categoryService.listCategory();
   console.log(this.categories)
  }
  
  @Output() createdProduct:EventEmitter<Create_Product>=new EventEmitter();
  @Output() fileUploadOptions:Partial< FileUploadOptions>={
    action:"upload",
    controller:"Products",
    explanation:"Resimleri sürükleyin veya seçin",
    isAdminPage:true,
    accept:".jpg, .png, .jpeg "
    
  }
create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement,category:any){
  this.showSpinner(SpinnerType.ballScaleMultiple)
   const create_product:Create_Product=new Create_Product();
   create_product.name=name.value;
   create_product.stock=parseInt(stock.value) ;
   create_product.price=parseFloat(price.value);
   create_product.categoryId=category
   
   this.productService.create(create_product,()=>
   {this.hideSpinner(SpinnerType.ballScaleMultiple),
    this.alertify.message("Ürün başarıyla eklendi",{
      dismissOthers:true,
      messageType:MessageType.Success,
      position:Position.TopRight
    });
    this.createdProduct.emit(create_product);
  },errorMessage=>{
    this.alertify.message(errorMessage,{
      dismissOthers:true,
      messageType:MessageType.Error,
      position:Position.TopRight
    })
    setTimeout(()=>{this.hideSpinner(SpinnerType.ballScaleMultiple)},1000)
    console.log(create_product)
  })
}
}
