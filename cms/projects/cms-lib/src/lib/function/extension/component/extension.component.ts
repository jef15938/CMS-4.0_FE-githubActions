import {
  Component, OnInit, AfterViewInit, Inject, ViewChild, ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CMS_EXTENSION_COMPONENT_MAPPINGS } from '../../../global/injection-token';
import { CmsExtensionComponentMapping } from '../../../global/interface';
import { CmsUserMenuResolver } from '../../../global/service';
import { MenuInfo } from '../../../global/api/neuxAPI/bean/MenuInfo';
import { DynamicWrapperComponent } from 'layout';

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
    @Inject(CMS_EXTENSION_COMPONENT_MAPPINGS) private cmsExtensionComponentMappings: CmsExtensionComponentMapping<any>[],
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

    const menus = this.cmsUserMenuResolver.getMenus();
    if (!menus?.length) {
      this.errorMsg = `系統異常 : 沒有Menu資料`;
      return;
    }

    const menu = this.findMenuByFuncId(this.funcId, menus);
    if (!menu) {
      this.errorMsg = `沒有找到對應的MenuInfo, func_id=[${this.funcId}]`;
      return;
    }

    const mapping = this.cmsExtensionComponentMappings.find(m => m.component_id === menu.component_id);
    if (!mapping) {
      this.errorMsg = `沒有找到對應的元件設定, func_id=[${this.funcId}]`;
      return;
    }

    const comp = mapping.component;
    if (!comp) {
      this.errorMsg = `沒有提供擴充功能元件, func_id=[${this.funcId}], component_id=[${mapping.component_id}]`;
      return;
    }

    this.dynamicWrapperComponent?.loadWithComponent(comp);
  }

  private findMenuByFuncId(funcId: string, sources: MenuInfo[]): MenuInfo {
    if (!funcId || !sources?.length) { return null; }
    const menu = sources.find(m => m?.func_id === `extension/${this.funcId}`);
    return menu || sources.map(s => this.findMenuByFuncId(funcId, s.children)).find(m => m?.func_id === `extension/${this.funcId}`);
  }

}
