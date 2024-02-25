import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client/http-client.service';
import { Observable } from 'rxjs';
import { IProduct } from '../../modules/home-page/interfaces/IProduct';
import { IUpdateProducts } from '../../modules/home-page/interfaces/IUpdateProducts';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private httpClient: HttpClientService
  ) { }

  public getAllProducts():Observable<Array<IProduct>>{
    return this.httpClient.get<Array<IProduct>>("/products");
  }

  public getProductByCategory(id:number):Observable<Array<IProduct>>{
    return this.httpClient.get<Array<IProduct>>(`/products/byCategory/${id}`);
  }

  public getNewCodeProduct():Observable<string>{
    return this.httpClient.get<string>("/products/codeProduct");
  }


  public postProduct(body:IProduct):Observable<string>{
    return this.httpClient.post<string,IProduct>("/products", body);
  }

  public patchProduct(body:IUpdateProducts, id:number):Observable<IUpdateProducts>{
    return this.httpClient.patch<IUpdateProducts>("/products",body,id);
  }

  public deleteProduct(id:number):Observable<IProduct>{
    return this.httpClient.delete<IProduct>("/products",id);
  }

}
