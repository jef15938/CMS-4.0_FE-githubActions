import { Injectable, Inject, Optional } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { CmsExtensionMenuResolver } from '../../global/interface';
import { CMS_EXTENSION_MENU_RESOLVER_TOKEN } from '../../global/injection-token';
import { MenuInfo } from '../api/neuxAPI/bean/MenuInfo';
import { MenuService } from '../api/service';

@Injectable()
export class CmsUserMenuResolver implements Resolve<any> {

  // private menus: MenuInfo[] = [];
  private menus: {
    cmsMenus: MenuInfo[],
    appMenus: MenuInfo[],
  } = {
      cmsMenus: [],
      appMenus: [],
    };

  constructor(
    private menuService: MenuService,
    @Optional() @Inject(CMS_EXTENSION_MENU_RESOLVER_TOKEN) private cmsExtensionMenuProvidor: CmsExtensionMenuResolver,
  ) { }

  getMenus() {
    return this.menus;
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.menuService.getUserMenu().pipe(
      concatMap(cmsMenus => {
        const menus = {
          cmsMenus: [],
          appMenus: [],
        };

        menus.cmsMenus = cmsMenus;

        if (!this.cmsExtensionMenuProvidor) { return of(menus); }
        return this.cmsExtensionMenuProvidor.resolve().pipe(
          map(extensionMenus => {
            menus.appMenus = extensionMenus || [];
            this.menus = menus;
            return menus;
          })
        );
      })
    );
  }
}
