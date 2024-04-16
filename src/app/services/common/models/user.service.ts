import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../Entities/user';
import { Create_User } from '../../../contracts/users/create_user';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService:HttpClientService) { }

 async create(user:User):Promise<Create_User>{
   const observable:Observable<Create_User|User> = this.httpClientService.post<Create_User | User>({
        contoller:"Users",
      },user);

    return await firstValueFrom(observable) as Create_User;
  }

  async Login(userNameOrEmail:string,password:string, callBackFunction?:()=> void):Promise<void>{
   const observable :Observable<any> =this.httpClientService.post({
      action:"Login",
      contoller:"Users",
      
    },{
      userNameOrEmail,
      password
    })
    await firstValueFrom(observable);
    callBackFunction();
  }
}
