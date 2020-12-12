import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Auth } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private auth: Auth,
              private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuth = this.auth.getAuth();
    if (!isAuth) {
      this.router.navigate(['/authentication/signin'])
    }

    return isAuth;
  }
}
