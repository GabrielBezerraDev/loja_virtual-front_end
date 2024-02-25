import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client/http-client.service';
import { Observable } from 'rxjs';
import { ICategory } from '../../modules/home-page/interfaces/ICategory';
import { urlBackend } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClientService) { }

public getAllCategory():Observable<Array<ICategory>>{
  return this.httpClient.get<Array<ICategory>>(`/categorys`);
}

public getCategory(id:number):Observable<ICategory>{
  return this.httpClient.get<ICategory>(`/categorys/${id}`);
}

}
