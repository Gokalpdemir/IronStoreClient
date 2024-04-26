import { Component, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { ProductService } from '../../services/common/models/product.service';
import { List_Product_Image } from '../../contracts/list_product_image';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { MatCard } from '@angular/material/card';
import { DialogService } from '../../services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
 
declare var $:any
@Component({
  selector: 'app-select-product-image-dialogs',
  templateUrl: './select-product-image-dialogs.component.html',
  styleUrl: './select-product-image-dialogs.component.scss',
})
export class SelectProductImageDialogsComponent extends BaseDialog<SelectProductImageDialogsComponent> implements OnInit {
  constructor(
    public dialogref: MatDialogRef<SelectProductImageDialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService:ProductService,
    private spinnerService:NgxSpinnerService,
    private dialogService:DialogService
  ) {
    super(dialogref);
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: '.png, .jpg, .jpeg, .gif',
    action: 'upload',
    isAdminPage: true,
    controller: 'Products',
    explanation: 'Ürün resmini seçin veya sürükleyin',
    queryString: `id=${this.data}`,
  };
  images:List_Product_Image[];
  async ngOnInit() {
    this.spinnerService.show(SpinnerType.BallSpinFade)
   this.getProductImage();
  } 
   async getProductImage(){
    this.images= await this.productService.getProductImage(this.data as string,()=>this.spinnerService.hide(SpinnerType.BallSpinFade))
   }
 async deleteImage(imageId:string,event:any){
    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data:DeleteState.Yes,
      afterClosed:async()=>{
        this.spinnerService.show(SpinnerType.BallSpinFade)
       await this.productService.deleteImage( this.data as string,imageId,()=> {
   
         this.spinnerService.hide(SpinnerType.BallSpinFade)
         var card=$(event.srcElement).parent().parent().parent()
         card.fadeOut(500);
        } )
      }
          
    })
    
  }
  @ViewChild(SelectProductImageDialogsComponent)selecProductImageComponent:SelectProductImageDialogsComponent
  selectedImageId:string
  showCase(imageId:string){
  this.spinnerService.show(SpinnerType.BallSpinFade)
   this.productService.selectShowCaseImage(imageId,this.data as string,()=>{
     this.spinnerService.hide(SpinnerType.BallSpinFade)
   })
   this.selectedImageId=imageId
  }
}
export enum SelectProductImageState {
  close,
}
