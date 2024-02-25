import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationUtils {

  public rulePagination: number;
  public static genericArray: Array<Array<any>> = [];

  constructor() { }

  public static definePagination<T>( rule:number,ArrayElements: Array<T>):Array<Array<T>>{
    if(ArrayElements.length === 0) return [];
    let tempArray: Array<T> = [];
    for(let i: number = 0; i < ArrayElements.length; i++){
      if(!(tempArray.length === rule)){
        tempArray.push(ArrayElements[i]);
        if(ArrayElements.length-1 === i) PaginationUtils.genericArray.push([...tempArray]);
      }else{
        PaginationUtils.genericArray.push([...tempArray]);
        tempArray = [];
        i -= 1;
      }
    }
    let teste: Array<Array<T>> = [...PaginationUtils.genericArray] as Array<Array<T>>;
    PaginationUtils.genericArray = [];
    return teste;
  }
}
