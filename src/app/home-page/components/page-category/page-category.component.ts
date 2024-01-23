import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NavigateService } from '../../../services/navigate.service';
import { ProductsService } from '../../../services/products.service';
import { IProduct } from '../../interfaces/IProduct';

interface GenericFunction<T>{
  ():T
}

@Component({
  selector: 'app-page-category',
  templateUrl: './page-category.component.html',
  styleUrl: './page-category.component.scss'
})
export class PageCategoryComponent implements OnInit {

  public allProducts: Array<IProduct> = [];

  constructor(
    private navigate:NavigateService,
    private productsService: ProductsService
  ){}

  ngOnInit(): void {
    this.getAllProducts();
  }

  private getAllProducts():void{
    this.productsService.getAllProducts()
    .subscribe(products => {
      this.allProducts = products;
      console.log(this.allProducts);
    });
  }

  public navigateTo(route:string):void{
    this.navigate.navigateTo(route);
  }

}
