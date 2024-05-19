import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { FileUploadModule } from '../../../services/common/file-upload/file-upload.module';
import { DeleteDirective } from '../../../directives/admin/delete.directive';
import { DeleteModule } from '../../../directives/admin/delete.module';


@NgModule({
  declarations: [
    UserComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatPaginator,
    MatDialogModule,
    DialogModule,
    FileUploadModule,
    DeleteModule,
    RouterModule.forChild([
      {path:"",component:UserComponent}
    ])
  ]
})
export class UserModule { }
