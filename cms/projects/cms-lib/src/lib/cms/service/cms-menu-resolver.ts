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

  private menus: MenuInfo[] = [];

  constructor(
    private menuService: MenuService,
    @Inject(CmsExtensionMenuResolver) private cmsExtensionMenuProvidor: ICmsExtensionMenuResolver,
  ) { }

  getMenus() {
    return this.menus || [];
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.menuService.getUserMenu().pipe(
      concatMap(cmsMenus => {
        if (!this.cmsExtensionMenuProvidor) { return of(cmsMenus); }
        return this.cmsExtensionMenuProvidor.resolve().pipe(
          map(extensionMenus => {
            let result = [].concat(cmsMenus);

            if (extensionMenus?.length) {
              this.addExtensionRoute(extensionMenus);
              result = result.concat(extensionMenus);
            }

            this.menus = JSON.parse(JSON.stringify(result));
            return result;
          })
        )
      })
    );
  }

  private addExtensionRoute(menus: MenuInfo[]) {
    if (!menus?.length) { return; }
    let children: MenuInfo[] = [];
    menus.forEach(menu => {
      menu.func_id = menu.func_id ? `extension/${menu.func_id}` : '';
      children = children.concat(menu.children || []);
    });
    this.addExtensionRoute(children);
  }
}