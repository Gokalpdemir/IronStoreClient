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

export const authGuard: CanActivateFn = (route, state) => {
  const token: string = localStorage.getItem('accessToken');
  const jwtHelper: JwtHelperService = inject(JwtHelperService);
  const router: Router = inject(Router)
  const toastr:CustomToastrService=inject(CustomToastrService);
  const spinner = inject(NgxSpinnerService);
   spinner.show(SpinnerType.SquareSpin);

  //   const tokenExpiration:Date= jwtHelper.getTokenExpirationDate(token);
  //  const decodeToken =jwtHelper.decodeToken(token);
  let expired: boolean;
  try {
    expired = jwtHelper.isTokenExpired(token);
  } catch {
    expired = true;
  }

  if (token == null || expired) {
    router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    toastr.message('Oturum Açmanız Gerekmektedir !', 'Yetkisiz Erişim !', {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight,
    });
    debugger
  }

   spinner.hide(SpinnerType.SquareSpin);
  return true;
};
