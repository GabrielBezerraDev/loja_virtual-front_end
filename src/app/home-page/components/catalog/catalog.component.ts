import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from '../../interfaces/ICategory';
import { ProductsService } from '../../../services/products.service';
import { PaginationService } from '../../../services/pagination.service';
import { IProduct } from '../../interfaces/IProduct';
import { IUpdatePagination } from '../../interfaces/IUpdatePagionation';

type IndexCategory = {[k:string]:number}
type ShowProducts = {[k:string]:Array<Array<IProduct>>}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
@Input() productsCategory: Array<ICategory> = [];
public indexPagination: number = 1;
public sections: IndexCategory = {};
public showProducts: ShowProducts = {};


  constructor(
    private productsService: ProductsService,
    private pagination: PaginationService
  ){
  }

  ngOnInit(): void {
    this.setPagination();
  }

  private setPagination():void{
    for(let i:number = 0; i < this.productsCategory.length; i++){
      this.sections[this.productsCategory[i].categoryName as keyof IndexCategory] = 0;
      this.showProducts[this.productsCategory[i].categoryName as keyof IndexCategory] =  (this.pagination.definePagination(6,this.productsCategory[i].product));
    }
  }

  public deleteProduct(id:number):void{
    this.productsService.deleteProduct(id).subscribe();
  }

  public updatePagination(update:IUpdatePagination):void{
    this.sections[update.category] = update.index;
  }
}
