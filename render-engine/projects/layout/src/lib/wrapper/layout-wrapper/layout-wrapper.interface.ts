import { ComponentRef } from '@angular/core';
import { TemplateInfo } from '../../interface/template-info.interface';
import { FieldInfo } from '../../interface/field-info.interface';

export interface LayoutWrapper {
  setMode(mode: 'preview' | 'edit'): void;
}

export enum LayoutWrapperSelectedTargetType {
  TEMPLATE = 'Template',
  FIELD = 'Field',
};

export interface TemplateFieldSelectEvent {
  selectedTarget: HTMLElement,
  selectedTargetType: LayoutWrapperSelectedTargetType,
  fieldInfo: FieldInfo;
}

export interface LayoutWrapperSelectEvent {
  selectedTarget: HTMLElement,
  selectedTargetType: LayoutWrapperSelectedTargetType,
  wrapper: LayoutWrapper;
  componentRef: ComponentRef<any>;
  templateInfo: TemplateInfo;
  fieldInfo?: FieldInfo;
}