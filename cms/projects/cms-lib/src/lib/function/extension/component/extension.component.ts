import {
  Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicWrapperComponent } from '@neux/core';
import { CmsUserMenuResolver } from '../../../global/service';
import { DynamicComponentFactoryService } from '@neux/render';
import { MenuInfoModel } from '../../../global/api/data-model/models/menu-info.model';

@Component({
  selector: 'cms-extension',
  templateUrl: './extension.component.html',
  styleUrls: ['./extension.component.scss']
})
export class ExtensionComponent implements OnInit, AfterViewInit {

  @ViewChild('dynamic') dynamicWrapperComponent: DynamicWrapperComponent<any>;

  funcId = '';
  errorMsg = '';

  private afterViewInit = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private cmsUserMenuResolver: CmsUserMenuResolver,
    private dynamicComponentFactoryService: DynamicComponentFactoryService,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.funcId = params.funcId;
      if (this.afterViewInit) {
        this.initState();
      }
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.afterViewInit = true;
    this.initState();
    this.changeDetectorRef.detectChanges();
  }

  private initState() {
    this.errorMsg = '';

    const menus = this.cmsUserMenuResolver.getMenus()?.appMenus;

    if (!menus?.length) {
      this.errorMsg = `系統異常 : 沒有Menu資料`;
      return;
    }

    const menu = this.findMenuByFuncId(this.funcId, menus);
    if (!menu) {
      this.errorMsg = `沒有找到對應的MenuInfo, func_id=[${this.funcId}]`;
      return;
    }

    const component = this.dynamicComponentFactoryService.getComponent(menu.funcId);
    if (!component) {
      this.errorMsg = `沒有提供擴充功能元件, func_id=[${this.funcId}]`;
      return;
    }

    this.dynamicWrapperComponent?.loadWithComponent(component);
  }

  private findMenuByFuncId(funcId: string, sources: MenuInfoModel[]): MenuInfoModel {
    if (!funcId || !sources?.length) { return null; }
    const menu = sources.find(m => m?.funcId === `${this.funcId}`);
    return menu || sources.map(s => this.findMenuByFuncId(funcId, s.children)).find(m => m?.funcId === `${this.funcId}`);
  }

}
