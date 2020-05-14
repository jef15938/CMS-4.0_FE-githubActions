import { TemplateInfo } from './template-info.interface';
import { FieldInfo } from './field-info.interface';

export interface TabInfo extends FieldInfo {
    tabId: string;
    children: TemplateInfo[];
}