import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Category } from '../../../contracts/Category/list-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClientService:HttpClientService) { }


  async listCategory(){
    const observable:Observable<{categories:List_Category[]}> =this.httpClientService.get({
      contoller:"Categories",
      action:"GetAll"
    })
    return (await firstValueFrom(observable)).categories
  }
}
