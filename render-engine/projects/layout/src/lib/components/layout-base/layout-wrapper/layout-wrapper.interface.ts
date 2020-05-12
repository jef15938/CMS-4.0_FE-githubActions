import { ComponentRef, ElementRef } from '@angular/core';
import { TemplateInfo } from '../../../interface';

export interface LayoutWrapper {
  containerDiv: ElementRef;
}

export interface LayoutWrapperEvent {
  wrapper: LayoutWrapper;
  componentRef: ComponentRef<any>;
  templateInfo: TemplateInfo;
}