import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlBackend } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public delete<T>(urlController:string, id:number):Observable<T>{
    return this.httpClient.delete<T>(`${urlBackend}${urlController}/${id}`);
  }

  public get<T>(urlController:string):Observable<T>{
    return this.httpClient.get<T>(`${urlBackend}${urlController}`);
  }

  public post<T,U>(urlController:string, body:U):Observable<T>{
    return this.httpClient.post<T>(`${urlBackend}${urlController}`,body);
  }

  public patch<T>(urlController:string, body:T, id:number):Observable<T>{
    return this.httpClient.patch<T>(`${urlBackend}${urlController}/${id}`,body);
  }

}
