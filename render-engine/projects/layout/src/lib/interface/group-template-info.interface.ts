import { TemplateInfo } from './template-info.interface';
import { FieldInfo } from './field-info.interface';

export interface GroupTemplateInfo extends TemplateInfo {
  attributes: {
    maxItemCount: string;
  };
  itemList: FieldInfo[][];
}
