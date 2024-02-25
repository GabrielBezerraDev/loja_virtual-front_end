import { HttpInterceptorFn } from '@angular/common/http';
import { TokenJwt } from '../../utils/token-jwt/token-jwt.utils';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    let token = TokenJwt.getToken();
    console.log(token);
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next(req);
};
