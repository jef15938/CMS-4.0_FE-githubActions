import { Injector } from '@angular/core';
import { TemplateBaseComponent } from './template-base.component';
import { TabTemplateInfo } from '../../../global/interface/tab-template-info.interface';
import { TemplateType } from '../template-wrapper/template-wrapper.interface';

export abstract class TabTemplateBaseComponent extends TemplateBaseComponent<TabTemplateInfo> {
  templateType = TemplateType.TAB;

  abstract defaultTemplateInfo: TabTemplateInfo;

  constructor(injector: Injector, templateId: string) { super(injector, templateId); }
}
