import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, audit, catchError, of } from 'rxjs';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(
    private toastrService: CustomToastrService,
    private userAuthService: UserAuthService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            this.toastrService.message(
              'Bu işlemi yapma yetkiniz bulunmamaktadır',
              'Yetkisiz İşlem !',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopLeft,
              }
            );
            
            this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data=>{
              console.log(data)
            })
              
           
            break;
          case HttpStatusCode.InternalServerError:
            this.toastrService.message(
              'Sunucuya erişilemiyor',
              'Sunucu hatası!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopLeft,
              }
            );
            break;
          case HttpStatusCode.BadRequest:
            this.toastrService.message(
              'Geçersiz istek yapıldı',
              'Geçersiz istek',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopLeft,
              }
            );

            break;
          case HttpStatusCode.NotFound:
            this.toastrService.message(
              'Sayfa bulunamadı',
              'Sayfa bulunamadı !',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopLeft,
              }
            );
            break;
          default:
            this.toastrService.message(
              'Beklenmeyen bir hata meydana gelmiştir',
              'Hata !',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopLeft,
              }
            );
            break;
        }
        console.log(error.message);
        return of(error);
      })
    );
  }


}
