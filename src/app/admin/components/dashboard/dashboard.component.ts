import { Component,Inject,OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalrService } from '../../../services/common/signalr.service';
import { ReceiveFunctions } from '../../../constants/receive-functions';
import { HubUrls } from '../../../constants/hub-urls';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent implements OnInit {
 constructor(
  spinner:NgxSpinnerService,
  private alertify:AlertifyService,
  private signalRservice:SignalrService,
){
  super(spinner)
  signalRservice.start(HubUrls.OrderHub)
  signalRservice.start(HubUrls.ProductHub)
 }

 ngOnInit(): void {
  this.signalRservice.on(ReceiveFunctions.ProductAddedMessageReceiveFunction,message=>{
    this.alertify.message(message,{
      messageType:MessageType.Notify,
      position:Position.TopLeft

    })
  })
  this.signalRservice.on(ReceiveFunctions.OrderAddedMessageReceiveFunction,message=>{
    this.alertify.message(message,{
      messageType:MessageType.Notify,
      position:Position.TopLeft
    })
  })
 }

}
