import { NgModule, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { DeleteDirective } from '../../../directives/admin/delete.directive';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogModule } from '../../../dialogs/dialog.module';
import { FileUploadModule } from '../../../services/common/file-upload/file-upload.module';
import { DeleteModule } from '../../../directives/admin/delete.module';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    ListComponent,
    
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:ProductsComponent}
    ]),
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
    MatSelectModule
   
  ]
})
export class ProductsModule { }
