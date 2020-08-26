import { QueryList, SimpleChanges } from '@angular/core';
import { LayoutWrapper, TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { TemplateFieldDirective } from '../layout-wrapper/field-directive/template-field.directive';
import { TemplatesContainerComponent } from '../templates-container/templates-container.component';
import { ContentTemplateInfoModel } from '../../../global/api/data-model/models/content-template-info.model';

export interface LayoutBase<TInfo extends ContentTemplateInfoModel> {
  parentLayoutWrapper: LayoutWrapper;
  templatesContainerComponents: QueryList<TemplatesContainerComponent>;
  templateFieldDirectives: TemplateFieldDirective[];
  templateInfo: TInfo;
  templateType: TemplateType;
  mode: 'preview' | 'edit';

  ngOnChanges(changes: SimpleChanges): void;
}
