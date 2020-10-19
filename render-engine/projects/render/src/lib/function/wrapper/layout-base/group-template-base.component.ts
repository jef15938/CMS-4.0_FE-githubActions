import { LayoutBaseComponent } from './layout-base.component';
import { GroupTemplateInfo } from '../../../global/interface/group-template-info.interface';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { Injector } from '@angular/core';

export abstract class GroupTemplateBaseComponent extends LayoutBaseComponent<GroupTemplateInfo> {
  templateType = TemplateType.GROUP;

  abstract defaultTemplateInfo: GroupTemplateInfo;

  constructor(injector: Injector, templateId: string) { super(injector, templateId); }
}
