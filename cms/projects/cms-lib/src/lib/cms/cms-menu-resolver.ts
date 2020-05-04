import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MenuService } from '../service/menu.service';

@Injectable()
export class CmsUserMenuResolver implements Resolve<any> {
  constructor(
    private _menuService: MenuService,
  ) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this._menuService.getUserMenu();
  }
}