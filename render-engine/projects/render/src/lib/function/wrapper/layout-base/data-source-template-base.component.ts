import { LayoutBaseComponent } from './layout-base.component';
import { DataSourceTemplateInfo } from '../../../global/interface/data-source.interface';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { OnChanges, SimpleChanges, OnInit, Injector, Directive, InjectFlags } from '@angular/core';
import { of, Observable } from 'rxjs';
import { takeUntil, tap, catchError } from 'rxjs/operators';
import { DataSourceService } from '../../../global/service/data-source.service';
import { ListDataSourceDataResponseModel } from '../../../global/api/data-model/models/list-data-source-data-response.model';
import { DATA_SOURCE_FACTORY_TOKEN } from './layout-base.injection-token';

@Directive()
export abstract class DataSourceTemplateBaseComponent<TData> extends LayoutBaseComponent<DataSourceTemplateInfo>
  implements OnInit, OnChanges {

  /**
   * FOR 編輯器加入版型時的預設資料
   * @abstract
   * @type {DataSourceTemplateInfo}
   * @memberof DataSourceTemplateBaseComponent
   */
  abstract defaultTemplateInfo: DataSourceTemplateInfo;

  get TYPE_ID() { return this.TEMPLATE_ID; }

  protected keyword = '';
  private hasSendInitGetDataRequest = false;

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

  getSourceData({ page = 1, pageSize = 0 } = {}): Observable<ListDataSourceDataResponseModel<TData>> {
    const type = this.TYPE_ID;
    const source = this.templateInfo?.source;
    const keyword = this.keyword || '';

    const dataSourceFactory = this.injector.get(DATA_SOURCE_FACTORY_TOKEN, null, InjectFlags.Optional);

    return (
      dataSourceFactory
        ? dataSourceFactory(this.injector, { page, pageSize, keyword })
        : this.dataSourceService.getDataSourceByTypeIDAndId<TData>(type, source, { page, pageSize, keyword })
    ).pipe(
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
