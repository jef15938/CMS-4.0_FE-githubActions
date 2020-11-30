import { QueryList, SimpleChanges, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { TemplateWrapper, TemplateType, WithRenderInfo } from '../template-wrapper/template-wrapper.interface';
import { TemplateFieldDirective } from '../template-field/template-field.directive';
import { TemplatesContainerComponent } from '../templates-container/templates-container.component';
import { ContentTemplateInfoModel } from '../../../global/api/data-model/models/content-template-info.model';
import { ListDataSourceDataResponseModel } from '../../../global/api/data-model/models/list-data-source-data-response.model';

export interface TemplateComponent<TInfo extends ContentTemplateInfoModel> extends WithRenderInfo {
  parentTemplateWrapper: TemplateWrapper;
  templatesContainerComponents: QueryList<TemplatesContainerComponent>;
  templateFieldDirectives: TemplateFieldDirective[];
  templateInfo: TInfo;
  templateType: TemplateType;
  ngOnChanges(changes: SimpleChanges): void;
}

export type DataSourceFactory<TData>
  = (injector: Injector, config: { page: number, pageSize: number, keyword: string }) => Observable<ListDataSourceDataResponseModel<TData>>;
