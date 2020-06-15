import { Component, OnInit, AfterViewInit, Inject, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsExtensionComponentMappings } from '../../../cms-lib.injection-token';
import { ICmsExtensionComponentMapping } from '../../../type/extension.type';
import { CmsUserMenuResolver } from '../../service/cms-menu-resolver';
import { MenuInfo } from '../../../neuxAPI/bean/MenuInfo';

@Component({
  selector: 'cms-extension',
  templateUrl: './extension.component.html',
  styleUrls: ['./extension.component.scss']
})
export class ExtensionComponent implements OnInit, AfterViewInit {

  @ViewChild("vc", { read: ViewContainerRef }) vc: ViewContainerRef;

  funcId = '';
  errorMsg = '';

  private componentRef: ComponentRef<any>;

  private afterViewInit = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cmsUserMenuResolver: CmsUserMenuResolver,
    @Inject(CmsExtensionComponentMappings) private cmsExtensionComponentMappings: ICmsExtensionComponentMapping<any>[],
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.funcId = params['funcId'];
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
    this.vc.clear();
    this.componentRef?.destroy();

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

    this.render(comp, this.vc);
  }

  private render(comp, vc: ViewContainerRef) {
    if (!comp) { return; }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(comp);
    const componentRef = vc.createComponent(componentFactory);
    this.componentRef = componentRef;
  }

  private findMenuByFuncId(funcId: string, sources: MenuInfo[]): MenuInfo {
    if (!funcId || !sources?.length) { return; }
    const menu = sources.find(m => m?.func_id === `extension/${this.funcId}`);
    return menu || sources.map(s => this.findMenuByFuncId(funcId, s.children)).find(m => m?.func_id === `extension/${this.funcId}`);
  }

}
