import { Injectable, Inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MenuService } from '../../service/menu.service';
import { CmsExtensionMenuResolver } from '../../cms-lib.injection-token';
import { ICmsExtensionMenuResolver } from '../../type/extension.type';
import { concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { MenuInfo } from '../../neuxAPI/bean/MenuInfo';

@Injectable()
export class CmsUserMenuResolver implements Resolve<any> {

  private _menus: MenuInfo[] = [];

  constructor(
    private _menuService: MenuService,
    @Inject(CmsExtensionMenuResolver) private _cmsExtensionMenuProvidor: ICmsExtensionMenuResolver,
  ) { }

  getMenus() {
    return this._menus || [];
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this._menuService.getUserMenu().pipe(
      concatMap(cmsMenus => {
        if (!this._cmsExtensionMenuProvidor) { return of(cmsMenus); }
        return this._cmsExtensionMenuProvidor.resolve().pipe(
          map(extensionMenus => {
            let result = [].concat(cmsMenus);

            if (extensionMenus?.length) {
              this._addExtensionRoute(extensionMenus);
              result = result.concat(extensionMenus);
            }

            this._menus = JSON.parse(JSON.stringify(result));
            return result;
          })
        )
      })
    );
  }

  private _addExtensionRoute(menus: MenuInfo[]) {
    if (!menus?.length) { return; }
    let children: MenuInfo[] = [];
    menus.forEach(menu => {
      menu.func_id = menu.func_id ? `extension/${menu.func_id}` : '';
      children = children.concat(menu.children || []);
    });
    this._addExtensionRoute(children);
  }
}