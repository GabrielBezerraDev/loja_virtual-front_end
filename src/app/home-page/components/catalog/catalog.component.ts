import { Component, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { ICategoryWithProducts } from '../../interfaces/ICategoryWithProducts';
import { ProductsService } from '../../../services/products/products.service';
import { PaginationUtils } from '../../../utils/pagination.utils';
import { IProduct } from '../../interfaces/IProduct';
import { IUpdatePagination } from '../../interfaces/IUpdatePagionation';

type IndexCategory = {[k:string]:number}
type ShowProducts = {[k:string]:Array<Array<IProduct>>}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit, AfterViewInit, OnChanges {
@Input() productsCategory: Array<ICategoryWithProducts> = [];
public indexPagination: number = 1;
public sections: IndexCategory = {};
public showProducts: ShowProducts = {};


  constructor(
    private productsService: ProductsService
  ){
  }

  ngOnInit(): void {
    this.setPagination();
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.productsCategory = changes["productsCategory"].currentValue;
      console.log(this.productsCategory[1]);
  }

  private setPagination():void{
    for(let i:number = 0; i < this.productsCategory.length; i++){
      this.sections[this.productsCategory[i].categoryName as keyof IndexCategory] = 0;
      this.showProducts[this.productsCategory[i].categoryName as keyof IndexCategory] =  (PaginationUtils.definePagination(6,this.productsCategory[i].product));
    }
    console.log(this.productsCategory[0]);
    console.log(this.productsCategory[0].product);
  }

  public deleteProduct(id:number):void{
    this.productsService.deleteProduct(id).subscribe();
  }

  public updatePagination(update:IUpdatePagination):void{
    this.sections[update.category] = update.index;
  }
}
