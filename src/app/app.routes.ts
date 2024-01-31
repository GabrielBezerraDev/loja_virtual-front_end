import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:"",
    loadChildren: () =>  import("./home-page/home-page.module").then(m => m.HomePageModule)
  },
  // {
  //   path:"",
  //   loadChildren: () =>  import("./teste/teste.module").then(m => m.TesteModule)
  // },
  {
    path:"**",
    redirectTo: ""
  }
];
