import { LayoutBaseComponent } from './layout-base.component';
import { GroupTemplateInfo, GroupItem } from '../../../global/interface/group-template-info.interface';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { Injector } from '@angular/core';

export abstract class GroupTemplateBaseComponent extends LayoutBaseComponent<GroupTemplateInfo> {
  templateType = TemplateType.GROUP;

  abstract defaultTemplateInfo: GroupTemplateInfo;

  constructor(injector: Injector, templateId: string) { super(injector, templateId); }

  shouldHidden(groupItems: GroupItem[]) {
    if (this.mode === 'edit') { return false; }
    return groupItems.some(item => !!item.extension?.hideden);
  }
}
