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

export interface WithRenderInfo {
  /** 版型是否被限制為固定 */
  fixed: boolean;
}

export interface TemplateWrapper extends WithRenderInfo{
  parentTemplatesContainer: { templates: ContentTemplateInfoModel[]; };
}

export enum TemplateWrapperSelectedTargetType {
  TEMPLATE = 'Template',
  FIELD = 'Field',
}

export interface TemplateFieldSelectEvent {
  selectedTarget: HTMLElement;
  selectedTargetType: TemplateWrapperSelectedTargetType;
  fieldInfo: ContentFieldInfoModel;
  fieldDirective: any;
}

export interface TemplateWrapperSelectEvent {
  selectedTarget: HTMLElement;
  selectedTargetType: TemplateWrapperSelectedTargetType;
  wrapper: TemplateWrapper;
  componentRef: ComponentRef<any>;
  templateType: TemplateType;
  templateInfo: ContentTemplateInfoModel;
  fieldInfo?: ContentFieldInfoModel;
  fieldDirective?: any;
}
