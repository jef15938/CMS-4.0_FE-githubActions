import { QueryList } from '@angular/core';
import { TemplateInfo } from '../../interface/template-info.interface';
import { LayoutWrapper } from './layout-wrapper/layout-wrapper.interface';


export interface LayoutBase<TInfo extends TemplateInfo> {
    parentLayoutWrapper: LayoutWrapper;
    childLayoutWrappers: QueryList<LayoutWrapper>;
    templateInfo: TInfo;
    mode: 'preview' | 'edit';
}