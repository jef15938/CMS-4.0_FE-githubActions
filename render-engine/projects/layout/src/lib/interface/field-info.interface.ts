export enum FieldType {
    TEXT = 'TEXT',
    TEXTEREA = 'TEXTEREA',
    LINK = 'LINK',
    BGIMG = 'BGIMG',
    IMG = 'IMG',
    GROUP = 'GROUP',
    HTMLEDITOR = 'HTMLEDITOR'
};

export interface FieldInfo {
    fieldId: string;
    fieldType: FieldType;
    fieldVal: any;
    extension: Map<string, string>;
}
