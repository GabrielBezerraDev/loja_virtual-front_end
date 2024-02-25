import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../../services/navigate/navigate.service';
import { ProductsService } from '../../../services/products/products.service';
import { IProduct } from '../../interfaces/IProduct';

import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { ICategoryWithProducts } from '../../interfaces/ICategoryWithProducts';
@Component({
  selector: 'app-page-category',
  templateUrl: './page-category.component.html',
  styleUrl: './page-category.component.scss'
})
export class PageCategoryComponent implements OnInit {

  public objectIsCreated: boolean = false;
  public objectCategory: Array<ICategoryWithProducts> =
    [
      {
        id:1,
        categoryName: "Esporte",
        product: []
      },
      {
        id:2,
        categoryName: "Equipamento",
        product: []
      },
      {
        id:3,
        categoryName: "Suplementos",
        product: []
      },
      {
        id:4,
        categoryName: "Cosmeticos",
        product: []
      }
    ];

  public objectCategoryArray: Array<ICategoryWithProducts> = [];
  public spinner: boolean = true;

  constructor(
    private productsService: ProductsService,
    private localStorage: LocalStorageService,
    private navigate:NavigateService
  ){}

  async ngOnInit(): Promise<void> {
    for(let i:number = 0; i < this.objectCategory.length; i++){
     await this.createObjectCategory(this.objectCategory[i].id).then((value) => this.objectCategory[i].product = value);
    }
    this.spinner = false;
    this.objectIsCreated = true;
  }

  private async createObjectCategory(id:number):Promise<Array<IProduct>>{
    return await new Promise((resolve,reject) => {
        this.productsService.getProductByCategory(id).subscribe(
          {
            next: (value) => {
              resolve(value);
            }
          }
        )

    })
  }

  public navigateTo(route:string):void{
    this.navigate.navigateTo(route);
  }

  public setFormType(value:boolean):void{
    this.localStorage.setDataLocalStorage("isEditForm",value);
  }
}
