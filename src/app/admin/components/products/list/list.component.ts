import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from '../../../../contracts/list_product';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any
import {
  AlertifyService,
  MessageType,
  Position,
} from '../../../../services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { RequestParameters } from '../../../../services/common/http-client.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { SelectProductImageDialogsComponent } from '../../../../dialogs/select-product-image-dialogs/select-product-image-dialogs.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent extends BaseComponent implements OnInit,AfterViewInit {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private aletifyService: AlertifyService,
    private dialogService:DialogService
  ) {
    super(spinner);
  }
  ngAfterViewInit(): void {
    
  }
  displayedColumns: string[] = [
    'name',
    'stock',
    'price',
    'createdDate',
    'updatedDate',
    'photos',
    'edit',
    'delete'
  ];
  controller: RequestParameters={contoller:"Products"}

  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
   async getProducts(){
    this.showSpinner(SpinnerType.SquareSpin);
    const allProductResponse:{totalProductCount:number,products:List_Product[]} = await this.productService.read(
      this.paginator?this.paginator.pageIndex:0,
      this.paginator?this.paginator.pageSize:5,
      () => this.hideSpinner(SpinnerType.SquareSpin),
      () =>{ 
        this.hideSpinner(SpinnerType.SquareSpin),
        this.aletifyService.message("Ürünler Listelenemedi", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight,
      })}
        
       
    );
    this.dataSource = new MatTableDataSource<List_Product>(allProductResponse.products);
    this.paginator.length=allProductResponse.totalProductCount
    
  }

  addProductImages(id:String){
     this.dialogService.openDialog({
      componentType:SelectProductImageDialogsComponent,
      data:id,
      options:{
        width:"1400px"
      }

    })
  }

  async pageChanged(){
    await this.getProducts()
  }
  async ngOnInit() {
   await  this.getProducts()
  }



}
