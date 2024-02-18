import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../login.service';



export const authLoginGuard: CanActivateFn = (route, state) => {
  return inject(LoginService).login() ? true : inject(Router).createUrlTree(['/login']);
};
