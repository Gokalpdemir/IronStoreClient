import { Injectable } from '@angular/core';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';
import { TokenResponse } from '../../../contracts/token/tokenResponse';
import { Observable, firstValueFrom } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(
    private httpClientService: HttpClientService,
    private toastrService: CustomToastrService
  ) {}

  async Login(
    userNameOrEmail: string,
    password: string,
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<any | TokenResponse> =
      this.httpClientService.post<any | TokenResponse>(
        {
          action: 'Login',
          contoller: 'Auth',
        },
        {
          userNameOrEmail,
          password,
        }
      );
    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
      this.toastrService.message(
        'Kullanıcı girişi başarıyla sağlanmıştır',
        'Giriş Başarılı',
        {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        }
      );
    }
    callBackFunction();
    console.log(observable);
  }

  async loginWithGoogle(
    user: SocialUser,
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> =
      this.httpClientService.post(
        {
          action: 'google-login',
          contoller: 'Auth',
        },
        user
      );

    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
      this.toastrService.message(
        'Google üzerinden  giriş başarılı',
        'Giriş Başarılı',
        {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        }
      );
    }
    callBackFunction();
  }

  // async refreshTokenLogin(
  //   refreshToken: string,
  //   callBackFunction?: () => void
  // ): Promise<any> {
  //   const observable: Observable<any | TokenResponse> =
  //     this.httpClientService.post(
  //       {
  //         contoller: 'Auth',
  //         action: 'RefreshTokenLoginAsync',
  //       },
  //       {refreshToken:refreshToken}
  //     );

  //   const tokenResponse: TokenResponse = await firstValueFrom(
  //     observable
  //   ) as TokenResponse;
  //   if (tokenResponse) {
  //     localStorage.setItem('accessToken', tokenResponse.token.accessToken);
  //     localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
  //   }
  //   console.log("df")

  //   callBackFunction();
  // }
  async refreshTokenLogin(refreshToken: string, callBackFunction?: (state) => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post({
      action: "refreshtokenlogin",
      contoller: "auth"
    }, { refreshToken: refreshToken });

    
      const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

     try{
      if (tokenResponse) {
        localStorage.setItem("accessToken", tokenResponse.token.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      }

      callBackFunction(tokenResponse?true:false);
     }catch{
      callBackFunction(false);
     }
   
  }

  async passwordReset(email:string, callBackFunction:()=>void){
     const observable:Observable<any>=this.httpClientService.post({
      contoller:"Auth",
      action:"password-reset"
     },{email:email})
     await firstValueFrom(observable);
     callBackFunction();
  }

  async verifyResetToken(resetToken:string,userId:string,callBackFunction?:()=>void):Promise<boolean>{
    const observable:Observable<any>=await this.httpClientService.post({
      contoller:"Auth",
      action:"verify-reset-token"
    },{
      resetToken:resetToken,
      userId:userId
    });

    const state:boolean= await firstValueFrom(observable);
    callBackFunction();
    return state;

  }
}
