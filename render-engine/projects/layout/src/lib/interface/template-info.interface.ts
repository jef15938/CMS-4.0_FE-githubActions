import { FieldInfo } from './field-info.interface';

export interface TemplateInfo {
    id: string;
    templateId: string;
    fieldList: FieldInfo[];
    attributeMap: Map<string, string>;
    toJson(): string;
};
