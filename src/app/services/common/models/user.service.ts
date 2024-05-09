import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../Entities/user';
import { Create_User } from '../../../contracts/users/create_user';
import { Observable, firstValueFrom } from 'rxjs';
import { Token } from '../../../contracts/token/token';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { TokenResponse } from '../../../contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService:HttpClientService,private toastrService:CustomToastrService) { }

 async create(user:User):Promise<Create_User>{
   const observable:Observable<Create_User|User> = this.httpClientService.post<Create_User | User>({
        contoller:"Users",
      },user);

    return await firstValueFrom(observable) as Create_User;
  }

   async updatePassword(userId:string,resetToken:string,password:string,passwordConfirm:string,successCallback?:()=>void,errorCallBack?:(err)=>void){
     const observable:Observable<any>=  this.httpClientService.post({
      contoller:"Users",
      action:"update-password"
     },{
        userId:userId,
        resetToken:resetToken,
        password:password,
        passwordConfirm:passwordConfirm
     })
      
     const promiseData:Promise<any>= firstValueFrom(observable)
     promiseData.then(data=> successCallback()).catch(err=>errorCallBack(err));
     await promiseData;
     
   }
 
}
