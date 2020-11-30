import { Injector } from '@angular/core';
import { TemplateBaseComponent } from './template-base.component';
import { GroupTemplateInfo, GroupItem } from '../../../global/interface/group-template-info.interface';
import { TemplateType } from '../template-wrapper/template-wrapper.interface';

export abstract class GroupTemplateBaseComponent extends TemplateBaseComponent<GroupTemplateInfo> {
  templateType = TemplateType.GROUP;

  abstract defaultTemplateInfo: GroupTemplateInfo;

  constructor(injector: Injector, templateId: string) { super(injector, templateId); }

  shouldHidden(groupItems: GroupItem[]) {
    if (this.renderPageState.isEditor) { return false; }
    return groupItems.some(item => !!item.extension?.hideden);
  }
}
