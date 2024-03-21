import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { ProductService } from '../../services/common/models/product.service';
import { BaseComponent, SpinnerType } from '../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import {
  DeleteDialogComponent,
  DeleteState,
} from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../../services/common/dialog.service';

declare var $: any;
@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef, //directive  nin kullanıldığı elementin ref getirir
    private _renderer: Renderer2, //dom manipülasyonları
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertify:AlertifyService,
    private dialogService:DialogService
  ) {
    const img = _renderer.createElement('img');
    img.setAttribute('src', '../../../../../assets/delete.png');
    img.setAttribute('style', 'cursor:pointer;');
    img.width = 35;
    img.height = 35;
    _renderer.appendChild(element.nativeElement, img);
    //native element html döndürür
   
  }
  @Input() controller: string;
  @Input() id: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();
  @HostListener('click')
  async onClick() {
    // this.spinner.show(SpinnerType.SquareSpin)
   this.dialogService.openDialog({componentType:DeleteDialogComponent,data:DeleteState.Yes,afterClosed:async () => {
    const td: HTMLTableCellElement = this.element.nativeElement;
    this.httpClientService
      .delete({ contoller: this.controller }, this.id)
      .subscribe((data) => {
        this.alertify.message("Ürün Silindi",{messageType:MessageType.Success,position:Position.TopRight,dismissOthers:true})
        $(td.parentElement).fadeOut(1000, () => {         
          this.callback.emit(); // getProduct u tetikleyip tabloyu yeniden yükler
        });
      },(errorResponse:HttpErrorResponse)=>{
        this.alertify.message("İşlem yapılamadı",{messageType:MessageType.Error,position:Position.TopRight,dismissOthers:true})
        $(td.parentElement).fadeOut(1000, () => {         
          this.callback.emit(); // getProduct u tetikleyip tabloyu yeniden yükler
        });
      });
  }})
    console.log(this.controller);
    
  }
  // openDialog(closeDialog: any): void {
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     width: '250px',
  //     data: DeleteState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result == DeleteState.Yes) {
  //       closeDialog();
  //     }
  //   });
  // }
}
