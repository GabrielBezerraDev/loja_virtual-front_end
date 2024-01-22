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

  public getAllProducts():Observable<string>{
    return this.httpClient.get("/products");
  }

  public postProduct(body:IProduct):Observable<IProduct>{
    return this.httpClient.post<IProduct>("/products", body);
  }

}
