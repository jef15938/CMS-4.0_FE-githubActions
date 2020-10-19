import { QueryList, SimpleChanges } from '@angular/core';
import { LayoutWrapper, TemplateType, WithRenderInfo } from '../layout-wrapper/layout-wrapper.interface';
import { TemplateFieldDirective } from '../layout-wrapper/field-directive/template-field.directive';
import { TemplatesContainerComponent } from '../templates-container/templates-container.component';
import { ContentTemplateInfoModel } from '../../../global/api/data-model/models/content-template-info.model';
import { SiteMapGetResponseModel } from '../../../global/api/data-model/models/site-map-get-response.model';

export interface LayoutBase<TInfo extends ContentTemplateInfoModel> extends WithRenderInfo {
  parentLayoutWrapper: LayoutWrapper;
  templatesContainerComponents: QueryList<TemplatesContainerComponent>;
  templateFieldDirectives: TemplateFieldDirective[];
  templateInfo: TInfo;
  templateType: TemplateType;
  ngOnChanges(changes: SimpleChanges): void;
}
