import { Call } from '@angular/compiler';
import { Inject, Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  constructor(@Inject('baseSignalRUrl') private baseSignalRUrl: string) {}

  start(hubUrl: string) {
    hubUrl = this.baseSignalRUrl + hubUrl;

    const builder: HubConnectionBuilder = new HubConnectionBuilder();
    
    const hubConnection: HubConnection = builder
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();
    hubConnection
      .start()
      .then(() => {
        console.log('connected');
      })
      .catch((err) => {
        setTimeout(() => this.start(hubUrl), 2000);
      });

    hubConnection.onreconnected((connectionId) => console.log('Reconnecteed'));
    hubConnection.onreconnecting((err) => console.log('Reconnecting'));
    hubConnection.onclose((err) => console.log('Close Reconnection'));
    return hubConnection;
  }

  invoke(
    hubUrl: string,
    procedureName: string,
    message: any,
    successCallBack?: (value) => void,
    errCallBack?: (err) => void
  ) {
    this.start(hubUrl)
      .invoke(procedureName, message)
      .then(successCallBack)
      .catch(errCallBack);
  }

  on(
    hubUrl: string,
    procedureName: string,
    callBack: (...message: any) => void
  ) {
    this.start(hubUrl).on(procedureName, callBack);
  }
}
