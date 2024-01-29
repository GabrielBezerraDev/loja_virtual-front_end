import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  public rulePagination: number;
  public genericArray: Array<Array<any>> = [];

  constructor() { }

  public definePagination<T>( rule:number,ArrayElements: Array<T>):Array<Array<T>>{
    if(ArrayElements.length === 0) return [];
    let tempArray: Array<T> = [];
    for(let i: number = 0; i < ArrayElements.length; i++){
      if(!(tempArray.length === rule)){
        tempArray.push(ArrayElements[i]);
        if(ArrayElements.length-1 === i) this.genericArray.push([...tempArray]);
      }else{
        this.genericArray.push([...tempArray]);
        tempArray = [];
        i -= 1;
      }
    }
    console.log(this.genericArray);
    let teste: Array<Array<T>> = [...this.genericArray] as Array<Array<T>>;
    this.genericArray = [];
    return teste;
  }
}
