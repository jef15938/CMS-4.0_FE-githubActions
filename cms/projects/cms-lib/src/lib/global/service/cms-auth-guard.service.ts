import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthorizationService } from '../api/service';

@Injectable()
export class CmsAuthGuard implements CanActivate {

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!localStorage.getItem('loginInfo')) {
      return this.toLoginPage();
    }
    return this.authorizationService.getLoginInfo().pipe(
      map(_ => true),
      catchError(err => {
        return this.toLoginPage();
      }),
    );
  }

  toLoginPage() {
    return of(this.router.parseUrl('login'));
  }
}
