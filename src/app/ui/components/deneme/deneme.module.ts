import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DenemeComponent } from './deneme.component';
import { RouterLink, RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DenemeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:DenemeComponent}
    ])
  ]
})
export class DenemeModule { }
