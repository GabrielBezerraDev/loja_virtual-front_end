import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { PageCategoryComponent } from './components/page-category/page-category.component';
import { PageProductsComponent } from './components/page-products/page-products.component';
import { CardComponent } from './components/card/card.component';
import {MatIconModule} from '@angular/material/icon';
import { FormProductComponent } from './components/form-product/form-product.component';
import { NavigateService } from '../services/navigate.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../services/products.service';
import { HttpClientService } from '../services/http-client.service';
import { CatalogComponent } from './components/catalog/catalog.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations:
  [
    PageCategoryComponent,
    PageProductsComponent,
    CardComponent,
    FormProductComponent,
    CatalogComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers:
  [
    NavigateService,
    ProductsService
  ]
})
export class HomePageModule { }
