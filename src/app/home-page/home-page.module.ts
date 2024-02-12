import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { PageCategoryComponent } from './components/page-category/page-category.component';
import { CardComponent } from './components/card/card.component';
import {MatIconModule} from '@angular/material/icon';
import { FormProductComponent } from './components/form-product/form-product.component';
import { NavigateService } from '../services/navigate.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { CatalogComponent } from './components/catalog/catalog.component';
import { SharedModule } from '../shared/shared.module';
import { PaginationService } from '../services/pagination.service';
import { WindowUtilsService } from '../services/window-utils.service';
import { BootstrapUtilsService } from '../services/bootstrap-utils.service';
import { CategoryService } from '../services/category.service';


@NgModule({
  declarations:
  [
    PageCategoryComponent,
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
    ProductsService,
    PaginationService,
    WindowUtilsService,
    BootstrapUtilsService,
    CategoryService
  ]
})
export class HomePageModule { }
