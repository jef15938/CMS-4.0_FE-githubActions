import { LayoutBaseComponent } from './layout-base.component';
import { GroupTemplateInfo } from '../../../global/interface/group-template-info.interface';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { Injector } from '@angular/core';

export abstract class GroupTemplateBaseComponent extends LayoutBaseComponent<GroupTemplateInfo> {
  templateType = TemplateType.GROUP;
  /**
   * 必填，不可為空值．編輯器用此Id的值作為個別GroupItem的顯示名稱．
   */
  abstract groupItemDisplayFieldId: string;
  /**
   * 必填，Group個數限制
   */
  abstract maxItemCount: number;

  abstract defaultTemplateInfo: GroupTemplateInfo;

  constructor(
    injector: Injector,
  ) { super(injector); }
}
