import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { List_Product } from '../../../../contracts/list_product';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../../../../services/common/models/file.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/ui/custom-toastr.service';
import { BasketService } from '../../../../services/common/models/basket.service';
import { Create_basket_Items } from '../../../../contracts/basket/create-basket-item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    spinner:NgxSpinnerService,
    private customToastrService:CustomToastrService,
    private basketService:BasketService
  ) {
    super(spinner)
  }

  baseUrls: string = 'https://localhost:7040';
  products: List_Product[];
  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 15;
  pageList: number[] = [];

  list() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.currentPageNo = parseInt(params['pageNo'] ?? 1);
      const data: { totalProductCount: number; products: List_Product[] } =
        await this.productService.read(
          this.currentPageNo - 1,
          this.pageSize,
          () => {},
          (errorMessage) => {}
        );
      this.products = data.products;

      this.products = this.products.map<List_Product>((p) => {
        const listProduct: List_Product = {
          id: p.id,
          createdDate: p.createdDate,
          imagePath: p.productImageFiles?.length
            ? p.productImageFiles.find((p) => p.showcase==true)?.path
            : '',
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          productImageFiles: p.productImageFiles,
        };

        return listProduct;
      });
      // console.log(this.products)
      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);
      this.pageList = [];
        
      if(Math.ceil(this.totalProductCount/this.pageSize)<=6){
        for (let i = 1; i <= Math.ceil(this.totalProductCount/this.pageSize); i++) {
          this.pageList.push(i);
        }
      }
      else if (this.currentPageNo - 3 <= 0) {
        for (let i = 1; i <= 7; i++) {
          this.pageList.push(i);
        }
      } else if (this.currentPageNo + 3 >= this.totalPageCount) {
        for (let i = this.currentPageNo - 3; i <= this.totalPageCount; i++) {
          this.pageList.push(i);
        }
      } else {
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++) {
          this.pageList.push(i);
        }
      }
      
    });
   
  }
  
 async addToBasket(productId:string){

  this.showSpinner(SpinnerType.BallSpinFade)
    let _basketItem:Create_basket_Items=new Create_basket_Items();
    _basketItem.productId=productId;
    _basketItem.quantity=1
    await this.basketService.add(_basketItem,()=>this.hideSpinner(SpinnerType.BallSpinFade));
    this.customToastrService.message("Ürün sepete eklendi","İşlem Başarılı",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.TopLeft
    })
  }
  async ngOnInit() {
    this.list();
  }
}
