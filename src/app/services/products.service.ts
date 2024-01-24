import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs';
import { IProduct } from '../home-page/interfaces/IProduct';

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

  public postProduct(body:IProduct):Observable<IProduct>{
    return this.httpClient.post<IProduct>("/products", body);
  }

  public patchProduct(body:Partial<IProduct>, id:number):Observable<Partial<IProduct>>{
    return this.httpClient.patch<Partial<IProduct>>("/products",body,id);
  }

  public getNewCodeProduct():Observable<string>{
    return this.httpClient.get<string>("/products/codeProduct");
  }

}
