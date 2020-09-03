import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MenuService } from '../api/service';
import { MenuInfoModel } from '../api/data-model/models/menu-info.model';
import { CmsErrorHandler } from '../error-handling';

@Injectable()
export class CmsUserMenuResolver implements Resolve<any> {

  private menus: MenuInfoModel[] = [];

  constructor(
    private menuService: MenuService,
  ) { }

  getMenus() {
    return this.menus;
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.menuService.getUserMenu().pipe(
      CmsErrorHandler.rxHandleError('取得功能 menu 清單錯誤'),
      tap(menus => {
        this.menus = menus;
        return of(menus);
      })
    );
  }
}
