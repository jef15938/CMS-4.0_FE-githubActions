import { ComponentRef } from '@angular/core';
import { ContentTemplateInfoModel } from '../../../global/api/data-model/models/content-template-info.model';
import { ContentFieldInfoModel } from '../../../global/api/data-model/models/content-field-info.model';
import { PageInfoGetResponseModel } from '../../../global/api/data-model/models/page-info-get-response.model';
import { SiteInfoModel } from '../../../global/api/data-model/models/site-info.model';

export enum TemplateType {
  COMMON = 'Common',
  TAB = 'Tab',
  DATA_SOURCE = 'DataSource',
  GROUP = 'Group',
  CUSTOMIZE = 'Customize',
}

export interface WithRenderInfo {
  mode: 'preview' | 'edit';
  sites: SiteInfoModel[];
  fixed: boolean;
  pageInfo: PageInfoGetResponseModel;
}

export interface LayoutWrapper extends WithRenderInfo{
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
