import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowUtilsService {

  constructor() { }

  public reloadPage():void{
    window.location.reload();
  }

}
