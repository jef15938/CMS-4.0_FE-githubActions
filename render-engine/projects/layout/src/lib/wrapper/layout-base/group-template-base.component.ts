import { LayoutBaseComponent } from './_base';
import { GroupTemplateInfo } from '../../interface/group-template-info.interface';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';

export abstract class GroupTemplateBaseComponent extends LayoutBaseComponent<GroupTemplateInfo> {
  templateType = TemplateType.GROUP;
  /**
   * 必填，不可為空值．編輯器用此Id的值作為個別GroupItem的顯示名稱．
   *
   * @abstract
   * @type {string}
   * @memberof DataSourceBaseComponent
   */
  abstract groupItemDisplayFieldId: string ;
}