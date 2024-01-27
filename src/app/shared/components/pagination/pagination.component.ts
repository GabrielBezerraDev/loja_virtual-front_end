import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit{

  public initNumber: number = 1;
  public rulePagination: number;
  public genericArray: Array<Array<any>> = [];

  ngOnInit(): void {
  }

  public definePagination<T>( rule:number,ArrayElements: Array<T>):Array<T>{
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
    console.log(this.genericArray[this.initNumber]);
    return this.genericArray[this.initNumber] as Array<T>;
  }

  public test(){
    alert("TESTE");
  }

}
