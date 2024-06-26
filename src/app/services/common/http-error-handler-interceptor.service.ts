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
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(
    private toastrService: CustomToastrService,
    private userAuthService: UserAuthService,
    private router:Router,
    private spinner:NgxSpinnerService

  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            this.spinner.hide(SpinnerType.SquareSpin)
            
          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
            if (!state) {
              const url = this.router.url;
              if (url == "/products")
                this.toastrService.message("Sepete ürün eklemek için oturum açmanız gerekiyor.", "Oturum açınız!", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.TopRight
                });
              else
                this.toastrService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır!", "Yetkisiz işlem!", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.BottomFullWidth
                });
            }
          }).then(data => {
            this.toastrService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır!", "Yetkisiz işlem!", {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.BottomFullWidth
            });
            this.spinner.hide(SpinnerType.SquareSpin)
          });
            
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
            const url = this.router.url;
              if (url == "/products")
                this.toastrService.message("Sepete ürün eklemek için oturum açmanız gerekiyor.", "Oturum açınız!", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.TopRight
                });
              else{this.toastrService.message(
                'Geçersiz istek yapıldı',
                'Geçersiz istek',
                {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.TopRight,
                }
              );}
            

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
        this.spinner.hide(SpinnerType.BallSpinFade)
        return of(error);
      })
    );
  }


}
