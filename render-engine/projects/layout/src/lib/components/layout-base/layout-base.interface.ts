import { TemplateInfo } from '../../interface';
import { QueryList } from '@angular/core';
import { LayoutWrapper } from '..';

export interface LayoutBase<TInfo extends TemplateInfo> {
    parentLayoutWrapper: LayoutWrapper;
    childLayoutWrappers: QueryList<LayoutWrapper>;
    templateInfo: TInfo;
    mode: 'preview' | 'edit';
}