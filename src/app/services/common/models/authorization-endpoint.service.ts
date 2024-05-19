import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationEndpointService {
  constructor(private httpClientService: HttpClientService) {}

  async assignRoleEndpoint(
    roles: string[],
    code: string,
    menu: string,
    successCallBack?: () => void,
    errorCallBack?: (err) => void
  ) {
    const observable: Observable<any> = this.httpClientService.post(
      {
        contoller: 'AuthorizationEndpoints',
      },
      {
        roles: roles,
        code: code,
        menu: menu,
      }
    );

    const promiseData = firstValueFrom(observable);
    promiseData
      .then((v) => successCallBack())
      .catch((err) => errorCallBack(err));
    return await promiseData;
  }

  async getRolesToEndpoint(
    code: string,
    menu: string,
    successCallBack?: () => void,
    errorCallBack?: (err) => void
  ) {
    const observable: Observable<any> = this.httpClientService.post(
      {
        contoller: 'AuthorizationEndpoints',
        action: 'GetRolesToEndpoints',
      },
      {
        code: code,
        menu: menu,
      }
    );

    const promiseData = firstValueFrom(observable);
    promiseData
      .then((v) => successCallBack())
      .catch((err) => errorCallBack(err));
    return await promiseData;
  }
}
