import { Injectable, Inject, Optional } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { CmsExtensionMenuResolver } from '../../global/interface';
import { CMS_EXTENSION_MENU_RESOLVER_TOKEN } from '../../global/injection-token';
import { MenuService } from '../api/service';
import { MenuInfoModel } from '../api/data-model/models/menu-info.model';

@Injectable()
export class CmsUserMenuResolver implements Resolve<any> {

  private menus: {
    cmsMenus: MenuInfoModel[],
    appMenus: MenuInfoModel[],
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
