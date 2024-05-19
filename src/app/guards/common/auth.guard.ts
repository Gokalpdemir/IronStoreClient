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
import { UserService } from '../../services/common/models/user.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const token: string = localStorage.getItem('accessToken');
  console.log(token);
  const jwtHelper: JwtHelperService = inject(JwtHelperService);
  const router: Router = inject(Router);
  const toastr: CustomToastrService = inject(CustomToastrService);
  const userService: UserService = inject(UserService);

  const spinner = inject(NgxSpinnerService);
  spinner.show(SpinnerType.SquareSpin);

  const decodeToken = jwtHelper.decodeToken(token);
  const userName =decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
 console.log(userName)
  const roles: string[] = await userService.getRolesToUser(
    userName,
    () => {},
    () => spinner.hide(SpinnerType.SquareSpin)
  );
  const isEmployee = roles.includes('employee');

  // Kullanıcı oturum açmış ve "çalışan" rolüne sahip değilse
  // if (!_isAuthenticated && !(isEmployee || userName === "Gökalp")) {
  //   router.navigate(['login'], { queryParams: { returnUrl: state.url } });
  //   toastr.message('Yetkisiz Erişim!', 'Lütfen Oturum Açınız!', {
  //     messageType: ToastrMessageType.Warning,
  //     position: ToastrPosition.TopRight,

  //   });

  //   spinner.hide(SpinnerType.SquareSpin);

  //   return false; // Yetkilendirme başarısız olduğu için false döndürüyoruz
  // }

  // spinner.hide(SpinnerType.SquareSpin);
  // return true; // Yetkilendirme başarılı olduğu için true döndürüyoruz
  
 
  if (!_isAuthenticated) {
    spinner.hide(SpinnerType.SquareSpin);
    return false;
  }
  if (userName === 'Gökalp' || isEmployee) {
    spinner.hide(SpinnerType.SquareSpin);

    return true;
  } else {
    spinner.hide(SpinnerType.SquareSpin);
 
    return false;
  }
  
};
