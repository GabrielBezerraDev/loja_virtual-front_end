import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../../services/navigate.service';
import { ProductsService } from '../../../services/products.service';
import { IProduct } from '../../interfaces/IProduct';
import { ECategorys } from '../../enum/ECategorys';
import { ICategory } from '../../interfaces/ICategory';
import { LocalStorageService } from '../../../services/local-storage.service';


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
  public spinner: boolean = true;

  constructor(
    private productsService: ProductsService,
    private localStorage: LocalStorageService,
    private navigate:NavigateService
  ){}

  ngOnInit(): void {
    this.createObjectCategory();
  }

  private getAllProducts():Promise<Array<IProduct>>{
    return new Promise((resolve, rejects) => {
      this.productsService.getAllProducts()
      .subscribe({
        next: products => {
          this.allProducts = products;
          resolve(this.allProducts);
        }
      });
    })
  }

  private async createObjectCategory():Promise<void>{
    await this.getAllProducts().then(() => this.spinner = false);
    for(let i: number = 0; i < this.enumsCategory.length; i++){
      for(let j: number = 0; j < this.allProducts.length; j++){
        if((this.enumsCategory[i] as string) === this.allProducts[j].category){
          (this.objectCategory[this.enumsCategory[i] as keyof ObjectCategory].product as Array<IProduct>).push(this.allProducts[j]);
        }
      }
    }
    this.objectCategoryArray = Object.values(this.objectCategory);
  }

  public navigateTo(route:string):void{
    this.navigate.navigateTo(route);
  }

  public setFormType(value:boolean):void{
    this.localStorage.setDataLocalStorage("isEditForm",value);
  }
}
