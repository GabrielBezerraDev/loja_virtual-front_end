import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageCategoryComponent } from './components/page-category/page-category.component';
import { FormProductComponent } from './components/form-product/form-product.component';

const routes: Routes =
[
  {
    path:"",
    redirectTo: "page-category",
    pathMatch: "full"
  },
  {
    path:"page-category",
    component: PageCategoryComponent
  },
  {
    path:"new-product",
    component: FormProductComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
