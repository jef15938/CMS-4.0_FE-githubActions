import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../../service/authorization.service';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CmsAuthGuard implements CanActivate {

  constructor(
    private _authService: AuthorizationService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this._authService.getLoginInfo().pipe(
      catchError(err => {
        return this._authService.login('admin', 'admin1234', 1).pipe(
          concatMap(_ => this._authService.getLoginInfo())
        );
      }),
      map(_ => true)
    )
  }
}