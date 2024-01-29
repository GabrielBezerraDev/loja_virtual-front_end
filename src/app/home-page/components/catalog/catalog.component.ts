import { Component, Input, OnInit, AfterContentInit,ViewChild } from '@angular/core';
import { ICategory } from '../../interfaces/ICategory';
import { ProductsService } from '../../../services/products.service';
import { PaginationService } from '../../../services/pagination.service';
import { IProduct } from '../../interfaces/IProduct';
import { IUpdatePagination } from '../../interfaces/IUpdatePagionation';

type test = {[k:string]:number}
type test2 = {[k:string]:Array<Array<IProduct>>}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
@Input() productsCategory: Array<ICategory> = [];
public indexPagination: number = 1;
public showProducts: Array<ICategory> = [];
public sections: test = {};
public teste2: test2 = {};


  constructor(
    private productsService: ProductsService,
    private pagination: PaginationService
  ){
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    for(let i:number = 0; i < this.productsCategory.length; i++){
      this.sections[this.productsCategory[i].categoryName as keyof test] = 0;
      this.teste2[this.productsCategory[i].categoryName as keyof test] =  (this.pagination.definePagination(6,this.productsCategory[i].product));
    }
  }

  public deleteProduct(id:number):void{
    this.productsService.deleteProduct(id).subscribe(value => console.log(value));
  }

  public updatePagination(update:IUpdatePagination):void{
    this.sections[update.category] = update.index;
  }
}
