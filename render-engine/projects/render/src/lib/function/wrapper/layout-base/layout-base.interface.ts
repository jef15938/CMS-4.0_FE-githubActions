import { QueryList, SimpleChanges, Injector } from '@angular/core';
import { LayoutWrapper, TemplateType, WithRenderInfo } from '../layout-wrapper/layout-wrapper.interface';
import { TemplateFieldDirective } from '../layout-wrapper/field-directive/template-field.directive';
import { TemplatesContainerComponent } from '../templates-container/templates-container.component';
import { ContentTemplateInfoModel } from '../../../global/api/data-model/models/content-template-info.model';
import { Observable } from 'rxjs';
import { ListDataSourceDataResponseModel } from '../../../global/api/data-model/models/list-data-source-data-response.model';

export interface LayoutBase<TInfo extends ContentTemplateInfoModel> extends WithRenderInfo {
  parentLayoutWrapper: LayoutWrapper;
  templatesContainerComponents: QueryList<TemplatesContainerComponent>;
  templateFieldDirectives: TemplateFieldDirective[];
  templateInfo: TInfo;
  templateType: TemplateType;
  ngOnChanges(changes: SimpleChanges): void;
}

export type DataSourceFactory<TData>
  = (injector: Injector, config: { page: number, pageSize: number, keyword: string }) => Observable<ListDataSourceDataResponseModel<TData>>;
