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
  private _connection: HubConnection;
  get connection(): HubConnection {
    return this._connection;
  }
  constructor(@Inject("baseSignalRUrl") private baseSignalRUrl:string) {}

  start(hubUrl: string) {
    hubUrl = this.baseSignalRUrl+hubUrl
    if (
      !this.connection ||
      this.connection?.state == HubConnectionState.Disconnected
    ) {
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
        this._connection = hubConnection;

    }
    this._connection.onreconnected((connectionId) =>console.log('Reconnecteed'));
    this._connection.onreconnecting((err) => console.log('Reconnecting'));
    this._connection.onclose((err) => console.log('Close Reconnection'));
  }

  invoke(
    procedureName: string,
    message: any,
    successCallBack?: (value) => void,
    errCallBack?: (err) => void
  ) {
    this.connection
      .invoke(procedureName, message)
      .then(successCallBack)
      .catch(errCallBack);
  }

  on(procedureName: string, callBack: (...message:any) => void) {
    this.connection.on(procedureName, callBack);
  }
}
