import { QueryList, SimpleChanges } from '@angular/core';
import { ContentTemplateInfo } from '../../../global/interface/content-template-info.interface';
import { LayoutWrapper, TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { TemplateFieldDirective } from '../layout-wrapper/field-directive/template-field.directive';
import { TemplatesContainerComponent } from '../templates-container/templates-container.component';

export interface LayoutBase<TInfo extends ContentTemplateInfo> {
  parentLayoutWrapper: LayoutWrapper;
  templatesContainerComponents: QueryList<TemplatesContainerComponent>;
  templateFieldDirectives: TemplateFieldDirective[];
  templateInfo: TInfo;
  templateType: TemplateType;
  mode: 'preview' | 'edit';

  ngOnChanges(changes: SimpleChanges): void;
}
