import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { PageCategoryComponent } from './components/page-category/page-category.component';
import { CardComponent } from './components/card/card.component';
import {MatIconModule} from '@angular/material/icon';
import { FormProductComponent } from './components/form-product/form-product.component';
import { NavigateService } from '../../services/navigate/navigate.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products/products.service';
import { CatalogComponent } from './components/catalog/catalog.component';
import { SharedModule } from '../../shared/shared.module';
import { PaginationUtils } from '../../utils/pagination/pagination.utils';
import { WindowUtils} from '../../utils/window/window-utils';
import { BootstrapUtils } from '../../utils/bootstrap/bootstrap-utils';
import { CategoryService } from '../../services/category/category.service';


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
    CategoryService
  ]
})
export class HomePageModule { }
