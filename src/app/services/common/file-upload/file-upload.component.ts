import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  AlertifyService,
  MessageType,
  Position,
} from '../../admin/alertify.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../ui/custom-toastr.service';
import { FileUploadDialogComponent, FileUploadDialogState } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../dialog.service';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  constructor(
    private httpClientServer: HttpClientService,
    private alertifyService: AlertifyService,
    private customToastrService: CustomToastrService,
    private dialog:MatDialog,
    private dialogService:DialogService
  ) {}
  @Output() uploadfile:EventEmitter<any>=new EventEmitter();
  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>;
  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;

    const fileData: FormData = new FormData();
    for (const file of files) {
      const fileEntry = file.fileEntry as FileSystemFileEntry;
      fileEntry.file((_file: File) => {
        console.log(_file)
        fileData.append(_file.name, _file, file.relativePath);
      });
      
    }
    this.dialogService.openDialog({componentType:FileUploadDialogComponent,data:FileUploadDialogState.Yes, afterClosed:()=>{
      this.httpClientServer
      .post(
        {
          contoller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ responseType: 'blob' }),
        },
        fileData
      )
      .subscribe(
        (data) => {
          const successMessage: string = 'Dosyalar başarıyla yüklenmiştir.';

          if (this.options.isAdminPage) {
            this.alertifyService.message(successMessage, {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight,
            });
            this.uploadfile.emit();
            
            
          } else {
            this.customToastrService.message(successMessage, 'Başarılı!', {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight,
            });
          }
        },
        (error: HttpErrorResponse) => {
          const errorMessage: string =
            'Dosya transferi sırasında hata alındı!.';
          if (this.options.isAdminPage) {
            this.alertifyService.message(errorMessage, {
              dismissOthers: true,
              messageType: MessageType.Error,
              position: Position.TopRight,
            });
          } else {
            this.customToastrService.message(errorMessage, 'Başarısız!', {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight,
            });
          }
        }
      );
     }} )
   
  }

  // openDialog(closeDialog: any): void {
  //   const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //     width: '250px',
  //     data: FileUploadDialogState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result == FileUploadDialogState.Yes) {
  //       closeDialog();
  //     }
  //   });
  // }
}
export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage: boolean = false;
}
