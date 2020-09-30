import { LayoutBaseComponent } from './layout-base.component';
import { DataSourceTemplateInfo } from '../../../global/interface/data-source-template-info.interface';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { OnChanges, SimpleChanges, OnInit, Injector, Directive } from '@angular/core';
import { of, Observable } from 'rxjs';
import { takeUntil, tap, catchError } from 'rxjs/operators';
import { DataSourceService } from '../../../global/service/data-source.service';
import { ListDataSourceDataResponseModel } from '../../../global/api/data-model/models/list-data-source-data-response.model';

@Directive()
export abstract class DataSourceTemplateBaseComponent<TData> extends LayoutBaseComponent<DataSourceTemplateInfo>
  implements OnInit, OnChanges {

  abstract defaultTemplateInfo: DataSourceTemplateInfo;

  get TYPE_ID() { return this.TEMPLATE_ID; }

  protected hasSendInitGetDataRequest = false;

  templateType = TemplateType.DATA_SOURCE;
  sourceData: ListDataSourceDataResponseModel<TData>;

  dataSourceService: DataSourceService;

  constructor(
    injector: Injector,
    templateId: string,
    protected mockData?: TData[]
  ) {
    super(injector, templateId);
    this.dataSourceService = this.injector.get(DataSourceService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (this.hasSendInitGetDataRequest || !this.mode || this.mode === 'edit' || !this.templateInfo?.source) { return; }
    this.getSourceData().subscribe();
    this.hasSendInitGetDataRequest = true;
  }

  getSourceData(): Observable<ListDataSourceDataResponseModel<TData>> {
    const type = this.TYPE_ID;
    const source = this.templateInfo?.source;
    return this.dataSourceService.getDataSourceByTypeIDAndId<TData>(type, source).pipe(
      takeUntil(this.destroy$),
      tap(sourceData => {
        this.sourceData = sourceData;
      }),
      catchError(err => {
        console.error('getSourceData err = ', err);
        return of(undefined);
      }),
    );
  }
}
