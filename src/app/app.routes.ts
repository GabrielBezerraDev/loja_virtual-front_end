import { Routes } from '@angular/router';
import { authLoginGuard } from './guards/auth-guard/auth-login.guard';

export const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>  import("./modules/login/login.module").then(m => m.LoginModule)
  },
  {
    path:"home",
    loadChildren: () =>  import("./modules/home-page/home-page.module").then(m => m.HomePageModule),
    canActivate: [authLoginGuard]
  },
  {
    path:"**",
    redirectTo: "login"
  }
];
