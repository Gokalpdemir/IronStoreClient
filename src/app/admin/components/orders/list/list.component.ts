import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { DialogOptions, DialogService } from '../../../../services/common/dialog.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { ProductService } from '../../../../services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectProductImageDialogsComponent } from '../../../../dialogs/select-product-image-dialogs/select-product-image-dialogs.component';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from '../../../../contracts/list_product';
import { MatPaginator } from '@angular/material/paginator';
import { RequestParameters } from '../../../../services/common/http-client.service';
import { OrderService } from '../../../../services/common/models/order.service';
import { List_Order } from '../../../../contracts/Order/list-order';
import { OrderDetailDialogComponent, OrderDetailDialogState } from '../../../../dialogs/order-detail-dialog/order-detail-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit{
  constructor(
    spinner: NgxSpinnerService,
    private aletifyService: AlertifyService,
    private dialogService:DialogService,
    private orderService:OrderService
  ) {
    super(spinner);
  }
 
  ngOnInit(): void {
    this.getOrders()
  }
  displayedColumns: string[] = [
    'orderCode',
    'userName',
    'totalPrice',
    'createdDate',
    'viewDetail',
    'delete'
    
  ];

  dataSource: MatTableDataSource<List_Order> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
   async getOrders(){
    this.showSpinner(SpinnerType.SquareSpin);
    const allOrderResponse:{totalOrderCount:number,orders:List_Order[]} = await this.orderService.getAllOrder(
      this.paginator?this.paginator.pageIndex:0,
      this.paginator?this.paginator.pageSize:5,
      ()=>this.hideSpinner(SpinnerType.SquareSpin)
    )
   
    this.dataSource = new MatTableDataSource<List_Order>(allOrderResponse.orders);
    this.paginator.length=allOrderResponse.totalOrderCount
    console.log(allOrderResponse)
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
  showDetail(orderId:string){
      this.dialogService.openDialog({
        componentType:OrderDetailDialogComponent,
        data:orderId,
        options:{width:"700px"}
      })
  }

  async pageChanged(){
    await this.getOrders()
  }
}
