import { FieldInfo } from './field-info.interface';

export interface TemplateInfo {
    id: string;
    templateId: string;
    fields: FieldInfo[];
    attributes: Map<string, string>;
    toJson(): string;
};
