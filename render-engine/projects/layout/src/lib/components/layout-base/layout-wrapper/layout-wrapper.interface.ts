import { ComponentRef, ElementRef } from '@angular/core';
import { TemplateInfo } from '../../../interface';

export interface LayoutWrapper {
  containerDiv: ElementRef;
  setMode(mode: 'preview' | 'edit'): void;
  setNowEdit(nowEdit: boolean): void;
}

export interface LayoutWrapperEvent {
  wrapper: LayoutWrapper;
  componentRef: ComponentRef<any>;
  templateInfo: TemplateInfo;
}