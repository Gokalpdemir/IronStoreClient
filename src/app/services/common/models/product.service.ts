import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { List_Product } from '../../../contracts/list_product';
import { List_Product_Image } from '../../../contracts/list_product_image';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}
  create(
    product: Create_Product,
    successCallback?: any,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          contoller: 'Products',
          action: 'add',
        },
        product
      )
      .subscribe({
        complete: successCallback,
        error: (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string; value: Array<string> }> =
            errorResponse.error;
          let message = '';
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              message += `${_v}<br>`;
            });
          });
          errorCallBack(message);
        },
      });
  }

  async read(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{ totalCount: number; products: List_Product[] }> {
    let _responseModel: { totalCount: number; products: List_Product[] } = null;
    const getFunc = this.httpClientService.get<{
      totalCount: number;
      products: List_Product[];
    }>({
      contoller: 'products',
      action: 'getall',
      queryString: `page=${page}&size=${size}`,
    });

    await firstValueFrom<{ totalCount: number; products: List_Product[] }>(
      getFunc
    )
      .then((data) => {
        _responseModel = data;
        successCallBack();
      })
      .catch((httpErrorResponse: HttpErrorResponse) => {
        errorCallBack(httpErrorResponse.error);
      });

    return _responseModel;
  }

 async delete(id: string) {
   const deleteObservable:Observable<any>=  this.httpClientService.delete<any>({ contoller: 'Products'},id);
    await firstValueFrom(deleteObservable);
  }

   async getProductImage(id:string,successCallBack?:()=> void):Promise<List_Product_Image[]>{
    const getObservable:Observable<List_Product_Image[]>=this.httpClientService.get<List_Product_Image[]>({contoller:"Products",action:"GetProductsImage"},id);
    const images:List_Product_Image[]=await firstValueFrom(getObservable);
     successCallBack();
    return images ;
  }

   async deleteImage(id:string,imageId:string,successCallback?:()=> void){
   const deleteObservable= this.httpClientService.delete({action:"DeleteProductImage",contoller:"Products",queryString:`imageId=${imageId}`},id)
   await firstValueFrom(deleteObservable);
   successCallback();
   }

}
