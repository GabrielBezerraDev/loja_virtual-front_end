import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from '../../interfaces/ICategory';
import { ProductsService } from '../../../services/products.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { PaginationService } from '../../../services/pagination.service';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {

@Input() productsCategory: Array<ICategory> = [];
public showProducts: Array<ICategory> = [];


  constructor(
    private productsService: ProductsService,
    private pagination: PaginationService
  ){
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.showProducts = [ ...this.productsCategory ];
    console.log(this.showProducts);
    for(let i:number = 0; i < this.productsCategory.length; i++){
      console.log(this.pagination.definePagination(2,this.productsCategory[i].product));
      this.showProducts[i].product = this.pagination.definePagination(2,this.productsCategory[i].product);
      // console.log(this.productsCategory[i].product);
    }
    console.log(this.showProducts);
  }

  public deleteProduct(id:number):void{
    this.productsService.deleteProduct(id).subscribe(value => console.log(value));
  }
}
