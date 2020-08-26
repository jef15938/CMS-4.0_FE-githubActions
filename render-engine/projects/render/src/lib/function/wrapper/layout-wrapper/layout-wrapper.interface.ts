import { ComponentRef } from '@angular/core';
import { ContentTemplateInfoModel } from '../../../global/api/data-model/models/content-template-info.model';
import { ContentFieldInfoModel } from '../../../global/api/data-model/models/content-field-info.model';

export enum TemplateType {
  COMMON = 'Common',
  TAB = 'Tab',
  DATA_SOURCE = 'DataSource',
  GROUP = 'Group',
  CUSTOMIZE = 'Customize',
}

export interface LayoutWrapper {
  parentTemplatesContainer: { templates: ContentTemplateInfoModel[]; };
}

export enum LayoutWrapperSelectedTargetType {
  TEMPLATE = 'Template',
  FIELD = 'Field',
}

export interface TemplateFieldSelectEvent {
  selectedTarget: HTMLElement;
  selectedTargetType: LayoutWrapperSelectedTargetType;
  fieldInfo: ContentFieldInfoModel;
  fieldDirective: any;
}

export interface LayoutWrapperSelectEvent {
  selectedTarget: HTMLElement;
  selectedTargetType: LayoutWrapperSelectedTargetType;
  wrapper: LayoutWrapper;
  componentRef: ComponentRef<any>;
  templateType: TemplateType;
  templateInfo: ContentTemplateInfoModel;
  fieldInfo?: ContentFieldInfoModel;
  fieldDirective?: any;
}
