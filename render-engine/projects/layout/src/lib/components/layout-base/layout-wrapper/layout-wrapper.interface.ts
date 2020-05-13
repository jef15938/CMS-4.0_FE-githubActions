import { ComponentRef, ElementRef } from '@angular/core';
import { TemplateInfo } from '../../../interface';

export interface LayoutWrapper {
  containerDiv: ElementRef;
  setMode(mode: 'preview' | 'edit'): void;
}

export interface LayoutWrapperSelectEvent {
  selectedTarget: HTMLElement,
  wrapper: LayoutWrapper;
  componentRef: ComponentRef<any>;
  templateInfo: TemplateInfo;
}