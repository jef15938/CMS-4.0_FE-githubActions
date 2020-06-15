import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthorizationService } from '../../service/authorization.service';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CmsAuthGuard implements CanActivate {

  constructor(
    private authService: AuthorizationService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.getLoginInfo().pipe(
      catchError(err => {
        return this.authService.login('admin', 'admin1234', 1).pipe(
          concatMap(_ => this.authService.getLoginInfo()),
          catchError(err => {
            console.error('login err = ');
            return of(true);
          }),
        );
      }),
      map(_ => true)
    )
  }
}