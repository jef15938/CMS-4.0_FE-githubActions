import { TemplateInfo } from '../../interface';
import { QueryList } from '@angular/core';
import { LayoutWrapper } from '..';

export interface LayoutBase<TInfo extends TemplateInfo> {
    childLayoutWrappers: QueryList<LayoutWrapper>
    templateInfo: TInfo;
    mode: 'preview' | 'edit';
}