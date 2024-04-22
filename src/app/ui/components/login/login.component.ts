import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UserAuthService } from '../../../services/common/models/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends BaseComponent {
  constructor(
    private userService: UserService,
    private toastService: CustomToastrService,
    spinner: NgxSpinnerService,
    private authService:AuthService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private socialAuthService:SocialAuthService,
    private userAuthService:UserAuthService
  ) {
    super(spinner);
    socialAuthService.authState.subscribe(async(user:SocialUser)=>{
      spinner.show(SpinnerType.BallSpinFade)
     await userAuthService.loginWithGoogle(user,()=> spinner.hide(SpinnerType.BallSpinFade));
     authService.identityCheck()
    })
  }

   async Login(userNameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallSpinFade)
   const result :any= await this.userAuthService.Login(userNameOrEmail, password,()=>{
    this.authService.identityCheck();
    this.activatedRoute.queryParams.subscribe(params=>{
      
      const returnUrl:string=params["returnUrl"];
      if(returnUrl){
          this.router.navigate([returnUrl]);
      }
    })
    this.hideSpinner(SpinnerType.BallSpinFade)
   }).catch(err=>{
    this.hideSpinner(SpinnerType.BallSpinFade);
   })
   
  }
}
