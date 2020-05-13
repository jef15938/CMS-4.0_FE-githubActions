import { ComponentRef, ElementRef } from '@angular/core';
import { TemplateInfo } from '../../../interface/template-info.interface';
import { FieldInfo } from '../../../interface/field-info.interface';

export interface LayoutWrapper {
  containerDiv: ElementRef;
  setMode(mode: 'preview' | 'edit'): void;
}

export type LayoutWrapperSelectedTargetType = 'template' | 'field';

export interface LayoutWrapperSelectEvent {
  selectedTarget: HTMLElement,
  selectedTargetType: LayoutWrapperSelectedTargetType,
  wrapper: LayoutWrapper;
  componentRef: ComponentRef<any>;
  templateInfo: TemplateInfo;
  fieldInfo?: FieldInfo;
}