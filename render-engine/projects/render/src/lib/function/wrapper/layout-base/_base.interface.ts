import { QueryList, SimpleChanges } from '@angular/core';
import { TemplateInfo } from '../../../global/interface/template-info.interface';
import { LayoutWrapper, TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { TemplateFieldDirective } from '../layout-wrapper/field-directive/template-field.directive';
import { TemplatesContainerComponent } from '../templates-container/templates-container.component';

export interface LayoutBase<TInfo extends TemplateInfo> {
  parentLayoutWrapper: LayoutWrapper;
  templatesContainerComponents: QueryList<TemplatesContainerComponent>;
  templateFieldDirectives: TemplateFieldDirective[];
  templateInfo: TInfo;
  templateType: TemplateType;
  mode: 'preview' | 'edit';

  ngOnChanges(changes: SimpleChanges): void;
}
