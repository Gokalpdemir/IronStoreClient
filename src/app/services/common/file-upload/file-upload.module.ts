import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [
    FileUploadComponent,
   
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    NgxFileDropModule
  ],
  exports:[
    FileUploadComponent
  ]
})
export class FileUploadModule { }
