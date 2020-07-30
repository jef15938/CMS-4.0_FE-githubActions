import {
  Component, OnInit, Input, OnDestroy, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  OnChanges, SimpleChanges
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subject, of, throwError, NEVER } from 'rxjs';
import { tap, takeUntil, concatMap, catchError } from 'rxjs/operators';
import { FarmService } from '../../../global/api/service';
import { FarmInfo, CmsFarmInfoCategory, CmsFarmTableDataInfo } from '../../../global/model';
import { CmsFarmTableDataAction } from '../../../global/enum';
import { ModalService } from '../modal';
import { FarmFormComp } from './farm-shared.interface';
import { FarmTableInfoActionEvent } from './component/farm-table-info/farm-table-info.type';
import { FarmFormModifyDataModalComponent } from './modal/farm-form-modify-data-modal/farm-form-modify-data-modal.component';
import { AuditingFarmDataModalComponent } from './modal/auditing-farm-data-modal/auditing-farm-data-modal.component';
import { FarmSharedService } from './farm-shared.service';

@Component({
  selector: 'cms-farm-shared',
  templateUrl: './farm-shared.component.html',
  styleUrls: ['./farm-shared.component.scss']
})
export class FarmSharedComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('subContainer', { read: ViewContainerRef }) subContainerViewContainerRef: ViewContainerRef;

  private searchInfoFormComponentMap = new Map<CmsFarmInfoCategory, FarmFormComp>();

  // @Input() title: string;
  @Input() categoryName: string;
  @Input() categoryId: string;
  @Input() isSub = false;

  @Input() farm: FarmInfo;

  activedCategory: CmsFarmInfoCategory;

  subComponentRef: ComponentRef<FarmSharedComponent>;

  currentTablePage = 1;

  destroyMe = new Subject();
  private destroy$ = new Subject();

  constructor(
    private farmSharedService: FarmSharedService,
    private farmService: FarmService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: ModalService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.farm) {
      this.destroySub();
      this.farm = changes.farm.currentValue;
      this.activedCategory = this.farm?.category[0];
    }
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  private getCategoryTableInfo(category: CmsFarmInfoCategory) {
    const page = this.currentTablePage;
    return of(undefined).pipe(
      concatMap(_ => this.searchInfoFormComponentMap.get(category)?.requestFormInfo() || throwError('No Category in Map.')),
      concatMap(searchFormInfo => { // TODO: 查詢 table 時帶 search 表單
        const queryParams: { [key: string]: string } = {};
        searchFormInfo.columns.forEach(column => {
          if (column.value) { queryParams[column.column_id] = `${column.value}`; }
        });
        return this.farmService.getFarmTableInfoByFuncID(category.category_id, page, queryParams).pipe(
          tap(farmTableInfo => {
            category.tableInfo = farmTableInfo;
          })
        );
      }),
      catchError(err => {
        console.error('getCategoryTableInfo() err = ', err);
        return NEVER;
      }),
    );
  }

  destroySelf() {
    this.destroyMe.next();
  }

  onTablePageChange(category: CmsFarmInfoCategory, page: number) {
    this.currentTablePage = page;
    this.getCategoryTableInfo(category).subscribe();
  }

  onSelectedTabChange(ev: MatTabChangeEvent) {
    this.activedCategory = this.farm.category[ev.index];
  }

  onSearchInfoFarmFormInfoCompEmit(category: CmsFarmInfoCategory, comp: FarmFormComp) {
    this.searchInfoFormComponentMap.set(category, comp);
  }

  onSearchInfoNeedQuery(category: CmsFarmInfoCategory) {
    this.currentTablePage = 1;
    this.getCategoryTableInfo(category).subscribe();
  }

  private createSub(category: CmsFarmInfoCategory) {
    if (!category) { return; }

    this.farmService.getFarmByFuncID(category.category_id).subscribe(farm => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FarmSharedComponent);
      const viewContainerRef = this.subContainerViewContainerRef;
      viewContainerRef.clear();
      this.subComponentRef = undefined;

      const subComponentRef = viewContainerRef.createComponent(componentFactory);
      subComponentRef.instance.isSub = true;
      subComponentRef.instance.farm = farm;
      subComponentRef.instance.categoryName = `${this.categoryName || ''}${this.categoryName ? ' > ' : ''}${category.category_name}`;
      this.subComponentRef = subComponentRef;
      this.subComponentRef.instance.destroyMe.pipe(
        takeUntil(this.destroy$),
        tap(_ => this.destroySub()),
      ).subscribe();
    });
  }

  private destroySub() {
    try {
      this.subComponentRef?.instance?.destroyMe?.unsubscribe();
    } catch (error) {
      console.error('destroySub() destroyMe.unsubscribe()', error);
    }
    try {
      this.subComponentRef?.destroy();
    } catch (error) {
      console.error('destroySub() subComponentRef.destroy()', error);
    }
    this.subContainerViewContainerRef?.clear();
    this.subComponentRef = undefined;
  }

  onTableActionClick(category: CmsFarmInfoCategory, event: FarmTableInfoActionEvent) {
    switch (event.action) {
      case CmsFarmTableDataAction.CREATE:
        this.openModifyDataModal('create', category);
        break;
      case CmsFarmTableDataAction.MODIFY:
        this.openModifyDataModal('edit', category, event.rowData);
        break;
      case CmsFarmTableDataAction.DELETE:
        this.deleteData(category, event.rowData);
        break;
      case CmsFarmTableDataAction.PUBLISH:
        this.auditingData(category, event.rowData);
        break;
      case CmsFarmTableDataAction.OFF:
        this.takeOffData(category, event.rowData);
        break;
      case CmsFarmTableDataAction.PREVIEW:
        this.openViewDataModal(category, event.rowData);
        break;
      case CmsFarmTableDataAction.MORE:
        this.createSub(category);
        break;
    }
  }

  private openViewDataModal(category: CmsFarmInfoCategory, rowData: CmsFarmTableDataInfo) {
    this.farmSharedService.openFarmPreview(category.category_id, rowData.data_id).subscribe();
  }

  private openModifyDataModal(action: 'create' | 'edit', category: CmsFarmInfoCategory, rowData?: CmsFarmTableDataInfo) {
    const funcID = category.category_id;
    const dataID = rowData?.data_id || '';
    if (action === 'edit' && !rowData) {
      alert('資料異常');
      return;
    }
    of(undefined).pipe(
      concatMap(_ => this.farmService.getFarmFormInfoByFuncID(funcID, rowData?.data_id)),
      concatMap(farmFormInfo => {
        return this.modalService.openComponent({
          component: FarmFormModifyDataModalComponent,
          componentInitData: {
            action,
            funcID,
            dataID,
            farmFormInfo,
          },
          modalSetting: {
            width: '1440px',
          }
        });
      })
    ).subscribe(confirm => {
      if (confirm) {
        this.getCategoryTableInfo(category).subscribe();
      }
    });
  }

  private takeOffData(category: CmsFarmInfoCategory, rowData: CmsFarmTableDataInfo) {
    this.farmService.takeOffFormData(category.category_id, rowData.data_id).subscribe(_ => {
      alert(`資料已下架 : ${rowData.data_id}`);
      this.getCategoryTableInfo(category).subscribe();
    });
  }

  private deleteData(category: CmsFarmInfoCategory, rowData: CmsFarmTableDataInfo) {
    // this.farmService.takeOffFormData(category.category_id, rowData.data_id).subscribe(_ => {
    //   alert(`資料已刪除 : ${rowData.data_id}`);
    //   this.getCategoryTableInfo(category).subscribe();
    // });
    // TODO: 刪除 Farm Table 資料
    alert('功能準備中');
  }

  private auditingData(category: CmsFarmInfoCategory, rowData: CmsFarmTableDataInfo) {
    this.modalService.openComponent({
      component: AuditingFarmDataModalComponent,
      componentInitData: {
        funcId: category.category_id,
        dataId: rowData.data_id,
      }
    }).subscribe(confirm => {
      if (confirm) {
        this.getCategoryTableInfo(category).subscribe();
      }
    });
  }

}
