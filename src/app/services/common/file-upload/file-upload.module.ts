import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileUploadDialogComponent } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';

@NgModule({
  declarations: [
    FileUploadComponent,
    FileUploadDialogComponent
   
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    NgxFileDropModule
  ],
  exports:[
    FileUploadComponent,
    
  ]
})
export class FileUploadModule { }
