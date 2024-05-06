import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImageDialogsComponent } from './select-product-image-dialogs/select-product-image-dialogs.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import {MatCardModule} from '@angular/material/card'
import { FormsModule } from '@angular/forms';
import { BasketItemRemoveDialogComponent } from './basket-item-remove-dialog/basket-item-remove-dialog.component';
import { CompleateShoppingDialogComponent } from './compleate-shopping-dialog/compleate-shopping-dialog.component';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogsComponent,
    BasketItemRemoveDialogComponent,
    CompleateShoppingDialogComponent,
    OrderDetailDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FileUploadModule,
    MatCardModule,
    FormsModule,
    MatTableModule,
    MatToolbarModule
  ],
  
})
export class DialogModule { }
