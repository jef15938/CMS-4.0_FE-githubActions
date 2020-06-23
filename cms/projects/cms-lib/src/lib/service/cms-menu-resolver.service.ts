import { Injectable, Inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { CmsExtensionMenuResolver, CMS_EXTENSION_MENU_RESOLVER } from './../type';
import { MenuInfo } from './../neuxAPI/bean/MenuInfo';
import { MenuService } from './../api/service';

@Injectable()
export class CmsUserMenuResolver implements Resolve<any> {

  private menus: MenuInfo[] = [];

  constructor(
    private menuService: MenuService,
    @Inject(CMS_EXTENSION_MENU_RESOLVER) private cmsExtensionMenuProvidor: CmsExtensionMenuResolver,
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
        );
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
