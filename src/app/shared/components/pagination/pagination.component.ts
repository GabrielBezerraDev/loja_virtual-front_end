import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit{

  @Input() paginationNumber: number = 1;
  public rulePagination: number;
  public genericArray: Array<Array<any>> = [];

  ngOnInit(): void {
  }



}
