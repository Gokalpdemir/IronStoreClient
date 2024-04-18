import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../services/ui/custom-toastr.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { _isAuthenticated } from '../../services/common/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const token: string = localStorage.getItem('accessToken');
  const jwtHelper: JwtHelperService = inject(JwtHelperService);
  const router: Router = inject(Router)
  const toastr:CustomToastrService=inject(CustomToastrService);
  const spinner = inject(NgxSpinnerService);
   spinner.show(SpinnerType.SquareSpin);
 
  //   const tokenExpiration:Date= jwtHelper.getTokenExpirationDate(token);
  //  const decodeToken =jwtHelper.decodeToken(token);
  


  if (!_isAuthenticated) {
    console.log(_isAuthenticated)
    router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    toastr.message('Oturum Açmanız Gerekmektedir !', 'Yetkisiz Erişim !', {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight,
    });
    
  }

   spinner.hide(SpinnerType.SquareSpin);
  return true;
};
