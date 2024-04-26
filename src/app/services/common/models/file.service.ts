import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, first, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
  private httpclientService:HttpClientService
  ) { }

 async getBaseUrl():Promise<string>{
 const baseUrlObservable:Observable<string>= this.httpclientService.get<string>({
    action:"GetBaseUrl",
    contoller:"Files"
  })

 return await firstValueFrom(baseUrlObservable)
 }
}
