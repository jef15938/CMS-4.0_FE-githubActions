import { FieldInfo } from './field-info.interface';

export interface ContentTemplateInfo {
  id: string;
  templateId: string;
  fields: FieldInfo[];
  attributes: { [key: string]: any };
}
