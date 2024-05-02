import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketsComponent } from './baskets.component';
import { RouterModule } from '@angular/router';
import { OdemeComponent } from './odeme/odeme.component';



@NgModule({
  declarations: [
    BasketsComponent,
    OdemeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:BasketsComponent},
      {path:"basket/odeme",component:OdemeComponent}
    ])
  ]
})
export class BasketsModule { }
