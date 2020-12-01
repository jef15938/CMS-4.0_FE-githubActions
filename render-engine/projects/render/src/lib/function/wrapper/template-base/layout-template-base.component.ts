import { Injector } from '@angular/core';
import { TemplateBaseComponent } from './template-base.component';
import { TemplateType } from '../template-wrapper/template-wrapper.interface';
import { LayoutInfo } from '../../../global/interface/layout-info.interface';

export abstract class LayoutTemplateBaseComponent extends TemplateBaseComponent<LayoutInfo> {
  templateType = TemplateType.CUSTOMIZE;
  defaultTemplateInfo: LayoutInfo;
  constructor(injector: Injector, templateId: string) { super(injector, templateId); }
}
