import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent {
 constructor(private spinner:NgxSpinnerService){}
 showSpinner(spinnerType:SpinnerType){
    this.spinner.show(spinnerType)
    //  setTimeout(()=>this.hideSpinner(spinnerType),1000)
 }
 hideSpinner(spinnerType:SpinnerType){
  this.spinner.hide(spinnerType)
 }
}

export enum SpinnerType{
  SquareSpin="s1",
  BallSpinFade="s2",
  ballScaleMultiple="s3"

}