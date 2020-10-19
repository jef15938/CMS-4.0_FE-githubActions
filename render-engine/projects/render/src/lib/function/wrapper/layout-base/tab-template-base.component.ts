import { LayoutBaseComponent } from './layout-base.component';
import { TabTemplateInfo } from '../../../global/interface/tab-template-info.interface';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { Injector } from '@angular/core';

export abstract class TabTemplateBaseComponent extends LayoutBaseComponent<TabTemplateInfo> {
  templateType = TemplateType.TAB;

  abstract defaultTemplateInfo: TabTemplateInfo;

  constructor(injector: Injector, templateId: string) { super(injector, templateId); }
}
