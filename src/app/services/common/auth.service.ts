import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './models/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper:JwtHelperService,private userService:UserService) { }

 async identityCheck(){
    const token: string = localStorage.getItem('accessToken');

    let expired: boolean;
   
   try {
     expired = this.jwtHelper.isTokenExpired(token);
   } catch {
     expired = true;
   }
  
   _isAuthenticated=token !=null && !expired ;
   
   console.log(_isAuthenticated)
    // console.log(this.jwtHelper.decodeToken(token)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'])
  }
  get isAuthenticated():boolean{
      return _isAuthenticated;
  }
}

export let _isAuthenticated:boolean;