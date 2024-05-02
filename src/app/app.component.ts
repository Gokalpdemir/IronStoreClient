import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { HttpClientService } from './services/common/http-client.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private toast: CustomToastrService,
    private httpClientService:HttpClientService
  ) {
    // httpClientService.get({
    //   contoller:"Baskets",
    //   action:"GetBasketItem"

    // },
     
      
    // ).subscribe(data=> console.log(data))


    authService.identityCheck();
  }

  ngOnInit(): void {}
  signOut() {
    localStorage.removeItem('accessToken');
    this.authService.identityCheck();
    this.router.navigate(['']);
    this.toast.message('Oturum kapatılmıştır!', 'Oturum Kapatıldı', {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight,
    });
  }
}
