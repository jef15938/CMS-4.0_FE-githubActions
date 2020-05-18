import { FieldInfo } from './field-info.interface';

export interface TemplateInfo {
    id: string;
    templateId: string;
    fields: FieldInfo[];
    attributes: { [key: string]: string };
};
