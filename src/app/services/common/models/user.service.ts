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

  async Login(userNameOrEmail:string,password:string, callBackFunction?:()=> void):Promise<any>{
    const observable :Observable<any|TokenResponse> =this.httpClientService.post<any|TokenResponse>({
       action:"Login",
       contoller:"Users",
       
     },{
       userNameOrEmail,
       password
     })
    const tokenResponse:TokenResponse= await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
     localStorage.setItem("accessToken",tokenResponse.token.accessToken)
      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır","Giriş Başarılı",{
       messageType:ToastrMessageType.Success,
       position:ToastrPosition.TopRight     
      })
    }
     callBackFunction();
   }

  async loginWithGoogle(user:SocialUser,callBackFunction?:()=>void):Promise<any>{
   const observable:Observable<SocialUser | TokenResponse>= this.httpClientService.post({
      action:"google-login",
      contoller:"Users",
    },user)

   const tokenResponse:TokenResponse= await firstValueFrom(observable) as TokenResponse
    
   if(tokenResponse){
    localStorage.setItem("accessToken",tokenResponse.token.accessToken);
    this.toastrService.message("Google üzerinden  giriş başarılı","Giriş Başarılı",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.TopRight     
     })
   }
   callBackFunction();
   }
}
