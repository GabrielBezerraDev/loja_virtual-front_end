import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client/http-client.service';
import { IUser } from '../../shared/interfaces/IUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isAllow: boolean = false;
  constructor(private httpClientService: HttpClientService) { }



  public authenticator(body: IUser):Observable<string>{
    return this.httpClientService.post<string,IUser>(`/auth`, body);
  }

  public login(){
    return this.isAllow;
  }

}
