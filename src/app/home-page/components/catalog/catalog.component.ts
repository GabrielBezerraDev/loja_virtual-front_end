import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ICategory } from '../../interfaces/ICategory';
import { ProductsService } from '../../../services/products.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements AfterViewInit {

@ViewChild(PaginationComponent) pagination: PaginationComponent;
@Input() productsCategory: Array<ICategory> = [];
public showProducts: Array<ICategory> = [];


  constructor(
    private productsService: ProductsService
  ){
  }

  ngAfterViewInit(): void {
     this.showProducts = this.pagination.definePagination(2,this.productsCategory);
  }

  public deleteProduct(id:number):void{
    this.productsService.deleteProduct(id).subscribe(value => console.log(value));
  }
}
