import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowUtils {

  constructor() { }

  public static reloadPage():void{
    window.location.reload();
  }

}
