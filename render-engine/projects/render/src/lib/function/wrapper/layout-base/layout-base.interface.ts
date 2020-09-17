import { QueryList, SimpleChanges } from '@angular/core';
import { LayoutWrapper, TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { TemplateFieldDirective } from '../layout-wrapper/field-directive/template-field.directive';
import { TemplatesContainerComponent } from '../templates-container/templates-container.component';
import { ContentTemplateInfoModel } from '../../../global/api/data-model/models/content-template-info.model';
import { SiteMapGetResponseModel } from '../../../global/api/data-model/models/site-map-get-response.model';

export interface LayoutBase<TInfo extends ContentTemplateInfoModel> {
  parentLayoutWrapper: LayoutWrapper;
  templatesContainerComponents: QueryList<TemplatesContainerComponent>;
  templateFieldDirectives: TemplateFieldDirective[];
  templateInfo: TInfo;
  templateType: TemplateType;
  mode: 'preview' | 'edit';
  runtime: boolean;
  fixed: boolean;
  sites: SiteMapGetResponseModel;
  ngOnChanges(changes: SimpleChanges): void;
}
