import { LayoutBaseComponent } from './layout-base.component';
import { DataSourceTemplateInfo } from '../../../global/interface/data-source-template-info.interface';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { OnChanges, SimpleChanges, OnInit, Injector, Directive } from '@angular/core';
import { of, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { DataSourceService } from '../../../global/service/data-source.service';
import { ListDataSourceDataResponseModel } from '../../../global/api/data-model/models/list-data-source-data-response.model';

@Directive()
export abstract class DataSourceTemplateBaseComponent<TData> extends LayoutBaseComponent<DataSourceTemplateInfo>
  implements OnInit, OnChanges {

  abstract defaultTemplateInfo: DataSourceTemplateInfo;
  abstract sourceType: string;

  templateType = TemplateType.DATA_SOURCE;
  sourceData: ListDataSourceDataResponseModel<TData>;

  dataSourceService: DataSourceService;

  constructor(
    injector: Injector,
    protected mockData?: TData[]
  ) {
    super(injector);
    this.dataSourceService = this.injector.get(DataSourceService);

  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getSourceData().subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    this.getSourceData().subscribe();
  }

  getSourceData(): Observable<ListDataSourceDataResponseModel<TData>> {
    console.warn('this.templateInfo = ', this.templateInfo);
    if (this.mode === 'edit' || !this.templateInfo?.source) { return of(undefined); }
    return this.dataSourceService.getDataSourceByTypeIDAndId<TData>(this.sourceType, this.templateInfo?.source).pipe(
      takeUntil(this.destroy$),
      tap(sourceData => this.sourceData = sourceData),
    );
  }
}
