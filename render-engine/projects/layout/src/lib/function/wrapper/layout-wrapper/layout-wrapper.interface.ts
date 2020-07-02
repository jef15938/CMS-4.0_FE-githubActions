import { ComponentRef } from '@angular/core';
import { TemplateInfo } from '../../../global/interface/template-info.interface';
import { FieldInfo } from '../../../global/interface/field-info.interface';

export enum TemplateType {
  COMMON = 'Common',
  TAB = 'Tab',
  DATA_SOURCE = 'DataSource',
  GROUP = 'Group',
  CUSTOMIZE = 'Customize',
}

export interface LayoutWrapper {
  parentTemplatesContainer: { templates: TemplateInfo[]; };
}

export enum LayoutWrapperSelectedTargetType {
  TEMPLATE = 'Template',
  FIELD = 'Field',
}

export interface TemplateFieldSelectEvent {
  selectedTarget: HTMLElement;
  selectedTargetType: LayoutWrapperSelectedTargetType;
  fieldInfo: FieldInfo;
  fieldDirective: any;
}

export interface LayoutWrapperSelectEvent {
  selectedTarget: HTMLElement;
  selectedTargetType: LayoutWrapperSelectedTargetType;
  wrapper: LayoutWrapper;
  componentRef: ComponentRef<any>;
  templateType: TemplateType;
  templateInfo: TemplateInfo;
  fieldInfo?: FieldInfo;
  fieldDirective?: any;
}
