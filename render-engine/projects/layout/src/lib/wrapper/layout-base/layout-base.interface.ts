import { QueryList } from '@angular/core';
import { TemplateInfo } from '../../interface/template-info.interface';
import { LayoutWrapper, TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { TemplateFieldDirective } from '../layout-wrapper/template-field.directive';

export interface LayoutBase<TInfo extends TemplateInfo> {
    parentLayoutWrapper: LayoutWrapper;
    childLayoutWrappers: QueryList<LayoutWrapper>;
    templateFieldDirectives: QueryList<TemplateFieldDirective>;
    templateInfo: TInfo;
    templateType: TemplateType;
    mode: 'preview' | 'edit';
}