import { Routes } from '@angular/router';
import { authLoginGuard } from './services/routingGuard/auth-login.guard';

export const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>  import("./login/login.module").then(m => m.LoginModule)
  },
  {
    path:"home",
    loadChildren: () =>  import("./home-page/home-page.module").then(m => m.HomePageModule),
    canActivate: [authLoginGuard]
  },
  {
    path:"**",
    redirectTo: "login"
  }
];
