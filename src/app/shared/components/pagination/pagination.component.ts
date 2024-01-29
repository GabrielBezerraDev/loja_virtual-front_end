import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUpdatePagination } from '../../../home-page/interfaces/IUpdatePagionation';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit{

  @Output() onUpdatePainationNumber: EventEmitter<IUpdatePagination> = new EventEmitter<IUpdatePagination>();
  @Input() indexFrom: string;
  @Input() maxIndexPagination: number;
  public paginationNumber: number = 0;
  public rulePagination: number;
  public genericArray: Array<Array<any>> = [];

  ngOnInit(): void {
  }

  private updateNumberPagination():void{
    this.onUpdatePainationNumber.emit({
      category: this.indexFrom,
      index: this.paginationNumber
    });
  }

  public sumIndexPagination():void{
    if(this.paginationNumber < this.maxIndexPagination-1) this.paginationNumber+=1;
    this.updateNumberPagination();
  }

  public minusIndexPagination():void{
    if(this.paginationNumber > 0) this.paginationNumber-= 1;
    this.updateNumberPagination();
  }



}
