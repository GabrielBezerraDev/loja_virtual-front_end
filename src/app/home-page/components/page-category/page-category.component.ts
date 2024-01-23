import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NavigateService } from '../../../services/navigate.service';
import { ProductsService } from '../../../services/products.service';
import { IProduct } from '../../interfaces/IProduct';
import { ECategorys } from '../../enum/ECategorys';
import { ICategory } from '../../interfaces/ICategory';


type ObjectCategory = {[k:string]:ICategory};

@Component({
  selector: 'app-page-category',
  templateUrl: './page-category.component.html',
  styleUrl: './page-category.component.scss'
})
export class PageCategoryComponent implements OnInit {

  private enumsCategory: Array<ECategorys> = Object.values(ECategorys);
  private objectCategory: ObjectCategory =
  {
    Esporte:
    {
      categoryName: "Esporte",
      product: []
    },
    Equipamento:
    {
      categoryName: "Equipamento",
      product: []
    },
    Suplementos:
    {
      categoryName: "Suplementos",
      product: []
    },
    Cosmeticos:
    {
      categoryName: "Cosmeticos",
      product: []
    }
  };
  private allProducts: Array<IProduct> = [];
  public objectCategoryArray: Array<ICategory> = [];

  constructor(
    private productsService: ProductsService
  ){}

  ngOnInit(): void {
    this.createObjectCategory();
  }

  private getAllProducts():Promise<Array<IProduct>>{
    return new Promise((resolve, rejects) => {
      this.productsService.getAllProducts()
      .subscribe(products => {
        this.allProducts = products;
        resolve(this.allProducts);
      });
    })
  }

  private async createObjectCategory():Promise<void>{
    await this.getAllProducts().then();
    for(let i: number = 0; i < this.enumsCategory.length; i++){
      for(let j: number = 0; j < this.allProducts.length; j++){
        // console.log(this.allProducts);
        // console.log((this.enumsCategory[i] as string) === this.allProducts[j].category);
        // console.log((this.enumsCategory[i] as string));
        // console.log(this.allProducts[j]);
        if((this.enumsCategory[i] as string) === this.allProducts[j].category){
          console.log("Teste");
          this.objectCategory[this.enumsCategory[i] as keyof ObjectCategory].product.push(this.allProducts[j]);
        }
      }
    }
    console.log(this.objectCategory);
    this.objectCategoryArray = Object.values(this.objectCategory);
    console.log(this.objectCategoryArray);
  }
}
