import { ContentTemplateInfo } from './content-template-info.interface';
import { FieldInfo } from './field-info.interface';

export interface GroupTemplateInfo extends ContentTemplateInfo {
  itemList: FieldInfo[][];
}
