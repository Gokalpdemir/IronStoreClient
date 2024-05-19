import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Role } from '../../../contracts/Role/list-Role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private httpClientService: HttpClientService) {}

  async createRole(name: string,successCallback?:()=>void,errorCallback?:(error)=>void) {
    const observable: Observable<any> = this.httpClientService.post(
      {
        contoller: 'Roles',
      },
      {
        name: name,
      }
    );
    const promiseData=firstValueFrom(observable)
    promiseData.then(value=> successCallback()).catch(err=>errorCallback(err))
    return await promiseData as {ısSuccess:boolean}
     
  }

   async getRoles(page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void){
     const observable:Observable<{ totalRoleCount: number; roles: List_Role[] }>=this.httpClientService.get({
      contoller:"Roles",
      queryString: `page=${page}&size=${size}`,
     })
        
    const promiseData=firstValueFrom(observable)
    promiseData.then(value=>successCallBack()).catch(err=>errorCallBack(err))
    return await promiseData ;
   }

   async getAllRoles():Promise<{roles:List_Role[]}>{
     const observable:Observable<{roles:List_Role[]}>= this.httpClientService.get({
      contoller:"Roles",
      action:"GetrolesNotPaginate"
     })

     return await firstValueFrom(observable)
   }
}
