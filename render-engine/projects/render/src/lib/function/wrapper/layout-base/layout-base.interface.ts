import { QueryList, SimpleChanges } from '@angular/core';
import { LayoutWrapper, TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { TemplateFieldDirective } from '../layout-wrapper/field-directive/template-field.directive';
import { TemplatesContainerComponent } from '../templates-container/templates-container.component';
import { ContentTemplateInfoModel } from '../../../global/api/data-model/models/content-template-info.model';
import { SitesResponseModel } from '../../../global/api/data-model/models/sites-response.model';

export interface LayoutBase<TInfo extends ContentTemplateInfoModel> {
  parentLayoutWrapper: LayoutWrapper;
  templatesContainerComponents: QueryList<TemplatesContainerComponent>;
  templateFieldDirectives: TemplateFieldDirective[];
  templateInfo: TInfo;
  templateType: TemplateType;
  mode: 'preview' | 'edit';
  runtime: boolean;
  sites: SitesResponseModel;
  ngOnChanges(changes: SimpleChanges): void;
}
