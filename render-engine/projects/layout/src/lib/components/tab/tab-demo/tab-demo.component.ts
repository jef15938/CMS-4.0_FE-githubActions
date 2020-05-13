import { Component, OnInit, ComponentFactoryResolver, Inject, AfterViewInit, ViewChildren, ViewContainerRef, QueryList, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { LayoutBaseComponent } from '../../../wrapper/layout-base/layout-base.component';
import { TabTemplateInfo } from '../../../interface/tab-template-info.interface';
import { TemplateInfo } from '../../../interface/template-info.interface';
import { COMPONENT_SERVICE_TOKEN } from '../../../injection-token';
import { TemplateType } from '../../../wrapper/layout-wrapper/layout-wrapper.interface';

@Component({
  selector: 'app-tab-demo',
  templateUrl: './tab-demo.component.html',
  styleUrls: ['./tab-demo.component.scss'],
})
export class TabDemoComponent extends LayoutBaseComponent<TabTemplateInfo> implements OnInit, AfterViewInit {
  templateType = TemplateType.TAB;
  
  private _tabContentHostList: QueryList<ViewContainerRef>;


  public get tabContentHostList(): QueryList<ViewContainerRef> {
    return this._tabContentHostList;
  }
  @ViewChildren('contentHost', { read: ViewContainerRef })
  public set tabContentHostList(value: QueryList<ViewContainerRef>) {
    console.log('set tabContentHistList', value);
    this._tabContentHostList = value;
    if (value.length > 0) {
      this.renderComponent();
    }
  }

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    @Inject(COMPONENT_SERVICE_TOKEN) componentFactory: any,
    changeDetector: ChangeDetectorRef
  ) {
    super(componentFactory, componentFactoryResolver, changeDetector);
  }

  ngOnInit() {
  }

  renderComponent(): void {
    console.log('is view init:', this.isViewInit);
    console.log('tab template info:', this.templateInfo);
    const templateIdList = this.templateInfo.tabList.map(x => x.children.templateId);

    if (templateIdList.length === this.tabContentHostList.length) {
      templateIdList.forEach((id, index) => {
        const component = this.embedView(this.tabContentHostList.toArray()[index], id);
        (component as ComponentRef<LayoutBaseComponent<TemplateInfo>>).instance.templateInfo = this.templateInfo.tabList[index].children;
      });
    }
    else {
      console.log(this.tabContentHostList.length);
      console.log(templateIdList.length);
      throw new Error('TemplateID and contentHost length not equal');
    }
  }
}
