import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setDataLocalStorage<T>(key:string, value:T):void{
    localStorage.setItem(key,JSON.stringify(value));
  }

  getDataLocalStorage<T>(key:string):T{
    return JSON.parse(localStorage.getItem(key) as string);
  }

  removeDataLocalStorage(key:string):void{
    localStorage.removeItem(key);
  }

}
