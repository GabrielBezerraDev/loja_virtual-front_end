import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlBackend } from '../environment/environment';
import { Observable } from 'rxjs';
import { IProduct } from '../home-page/interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public delete<T>(urlController:string):Observable<T>{
    return this.httpClient.delete<T>(`${urlBackend}${urlController}`)
  }

  public get<T>(urlController:string):Observable<T>{
    return this.httpClient.get<T>(`${urlBackend}${urlController}`);
  }

  public post<T>(urlController:string, body:T):Observable<T>{
    return this.httpClient.post<T>(`${urlBackend}${urlController}`,body);
  }

  public patch<T>(urlController:string, body:T, id:number):Observable<T>{
    return this.httpClient.patch<T>(`${urlBackend}${urlController}/${id}`,body);
  }

}
