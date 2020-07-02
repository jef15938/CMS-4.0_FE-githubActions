import { LayoutBaseComponent } from './_base';
import { DataSourceTemplateInfo } from '../../../global/interface/data-source-template-info.interface';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { OnChanges, SimpleChanges, OnInit, Injector } from '@angular/core';
import { of, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

export abstract class DataSourceTemplateBaseComponent<TData> extends LayoutBaseComponent<DataSourceTemplateInfo>
  implements OnInit, OnChanges {

  templateType = TemplateType.DATA_SOURCE;
  sourceData: TData[] = [];

  constructor(
    injector: Injector,
  ) { super(injector); }

  ngOnInit(): void {
    super.ngOnInit();
    this.getSourceData().subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    this.getSourceData().subscribe();
  }

  getSourceData(): Observable<TData[]> {
    if (this.mode === 'edit' || !this.templateInfo?.source) { return of(undefined); }
    const r: any[] = [];
    for (let i = 0, l = 10; i < l; ++i) {
      const seq = i + 1;
      r.push({
        id: `d${seq}`,
        title: `公告事項(${seq})`,
        content: `測試公告事項內文${seq}`,
        date: '2020-06-01',
      });
    }
    return of(r).pipe(
      takeUntil(this.destroy$),
      tap(sourceData => this.sourceData = sourceData),
    );
  }
}
