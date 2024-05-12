import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, first, firstValueFrom } from 'rxjs';
import { Menu } from '../../../contracts/AuthorizeMenu/Menu';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientService:HttpClientService) { }

 async getAuthorizeDEfinitionEndpoints():Promise<Menu[]>{
    const observable:Observable<Menu[]> = this.httpClientService.get({
      contoller:"ApplicationServices"
    })

     const promiseData= await firstValueFrom(observable)
     return promiseData;
  }
}
