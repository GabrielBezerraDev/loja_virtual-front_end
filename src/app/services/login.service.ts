import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { IUser } from '../shared/interfaces/IUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isAllow: boolean = false;
  constructor(private httpClientService: HttpClientService) { }



  public authenticator(email:string):Observable<IUser>{
    return this.httpClientService.get<IUser>(`/user/${email}`);
  }

  public login(){
    return this.isAllow;
  }

}
