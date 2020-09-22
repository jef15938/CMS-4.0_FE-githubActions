import {
  Component, OnInit, Input, OnDestroy, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  OnChanges, SimpleChanges
} from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { tap, takeUntil, concatMap, map } from 'rxjs/operators';
import { FarmService } from '../../../global/api/service';
import { ModalService } from '../modal';
import { FarmTableInfoActionEvent } from './component/farm-table-info/farm-table-info.type';
import { FarmFormModifyDataModalComponent } from './modal/farm-form-modify-data-modal/farm-form-modify-data-modal.component';
import { AuditingFarmDataModalComponent } from './modal/auditing-farm-data-modal/auditing-farm-data-modal.component';
import { FarmSharedService } from './farm-shared.service';
import { PreviewInfoType } from '../../../global/api/data-model/models/preview-info.model';
import { FarmCategoryInfoModel } from '../../../global/api/data-model/models/farm-category-info.model';
import { FarmInfoGetResponseModel } from '../../../global/api/data-model/models/farm-info-get-response.model';
import { FarmTableDataInfoAction, FarmTableDataInfoModel } from '../../../global/api/data-model/models/farm-table-data-info.model';
import { CmsErrorHandler } from '../../../global/error-handling';
import { FarmFormInfoComponent } from './component/farm-form-info/farm-form-info.component';
import { FarmFormInfoModel } from '../../../global/api/data-model/models/farm-form-info.model';

@Component({
  selector: 'cms-farm-shared',
  templateUrl: './farm-shared.component.html',
  styleUrls: ['./farm-shared.component.scss']
})
export class FarmSharedComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('FarmSearchComp') searchInfoComponent: FarmFormInfoComponent;
  @ViewChild('subContainer', { read: ViewContainerRef }) subContainerViewContainerRef: ViewContainerRef;

  // @Input() title: string;
  @Input() categoryName: string;
  @Input() isSub = false;
  @Input() funcID = '';
  @Input() farm: FarmInfoGetResponseModel;

  subComponentRef: ComponentRef<FarmSharedComponent>;

  private currentTablePage = 1;

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
      this.resetTablePage();
    }
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  private resetTablePage() {
    this.currentTablePage = 1;
  }

  queryData(category: FarmCategoryInfoModel) {
    this.resetTablePage();
    this.getCategoryTableInfo(category).subscribe();
  }

  clearSearchInfoAndQueryData(category: FarmCategoryInfoModel) {
    this.searchInfoComponent.clearForm();
    this.resetTablePage();
    this.getCategoryTableInfo(category).subscribe();
  }

  private getCategoryTableInfo(category: FarmCategoryInfoModel) {
    const page = this.currentTablePage;
    return of(undefined).pipe(
      concatMap(_ => this.searchInfoComponent?.getFormInfo() || of(undefined)),
      concatMap((searchFormInfo: FarmFormInfoModel) => {
        const queryParams: { [key: string]: string } = {};
        if (searchFormInfo) {
          searchFormInfo.columns.forEach(column => {
            if (column.value) { queryParams[column.columnId] = `${column.value}`; }
          });
        }
        return this.farmService.getFarmTableInfoByFuncID(category.categoryId, page, queryParams)
          .pipe(
            tap(farmTableInfo => {
              category.tableInfo = farmTableInfo;
            }),
            CmsErrorHandler.rxHandleError(),
          );
      }),
    );
  }

  destroySelf() {
    this.destroyMe.next();
  }

  onTablePageChange(category: FarmCategoryInfoModel, page: number) {
    this.currentTablePage = page;
    this.getCategoryTableInfo(category).subscribe();
  }

  private seeMore(category: FarmCategoryInfoModel, rowData: FarmTableDataInfoModel) {
    if (!category) { return of(undefined); }

    return this.farmService.getFarmByFuncID(rowData.moreFuncId, rowData.dataId, category.categoryId)
      .pipe(
        tap(farm => {
          const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FarmSharedComponent);
          const viewContainerRef = this.subContainerViewContainerRef;
          viewContainerRef.clear();
          this.subComponentRef = undefined;

          const subComponentRef = viewContainerRef.createComponent(componentFactory);
          subComponentRef.instance.isSub = true;
          subComponentRef.instance.farm = farm;
          subComponentRef.instance.categoryName = `${this.categoryName || ''}${this.categoryName ? ' > ' : ''}${category.categoryName}`;
          this.subComponentRef = subComponentRef;
          this.subComponentRef.instance.destroyMe.pipe(
            takeUntil(this.destroy$),
            tap(_ => this.destroySub()),
          ).subscribe();
        }),
        CmsErrorHandler.rxHandleError(),
      );
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

  onTableActionClick(category: FarmCategoryInfoModel, event: FarmTableInfoActionEvent) {
    let action: Observable<{ refresh: boolean }> = of({ refresh: false });
    switch (event.action) {
      case FarmTableDataInfoAction.CREATE:
        action = this.openModifyDataModal('create', category).pipe(map(confirm => ({ refresh: confirm })));
        break;
      case FarmTableDataInfoAction.MODIFY:
        action = this.openModifyDataModal('edit', category, event.rowData).pipe(map(confirm => ({ refresh: confirm })));
        break;
      case FarmTableDataInfoAction.PUBLISH:
        action = this.auditingData(category, event.rowData).pipe(map(confirm => ({ refresh: confirm })));
        break;
      case FarmTableDataInfoAction.OFF:
        action = this.takeOffData(category, event.rowData).pipe(map(_ => ({ refresh: true })));
        break;
      case FarmTableDataInfoAction.PREVIEW:
        action = this.preview(category, event.rowData).pipe(map(_ => ({ refresh: false })));
        break;
      case FarmTableDataInfoAction.MORE:
        action = this.seeMore(category, event.rowData).pipe(map(_ => ({ refresh: false })));
        break;
    }
    action.subscribe(res => {
      if (res?.refresh) {
        this.getCategoryTableInfo(category).subscribe();
      }
    });
  }

  private preview(category: FarmCategoryInfoModel, rowData: FarmTableDataInfoModel) {
    const funcID = category.categoryId;
    const dataID = rowData.dataId;
    return this.farmService.getPreviewInfo(funcID, dataID)
      .pipe(
        tap(previewInfo => {
          switch (previewInfo.previewType) {
            case PreviewInfoType.ONE_PAGE:
              window.open(previewInfo.url, '_blank', 'noopener=yes,noreferrer=yes');
              break;
            case PreviewInfoType.FARM:
              this.farmSharedService.openFarmPreview(previewInfo.funcId, previewInfo.dataId).subscribe();
              break;
          }
        }),
        CmsErrorHandler.rxHandleError(),
      );
  }

  private openModifyDataModal(action: 'create' | 'edit', category: FarmCategoryInfoModel, rowData?: FarmTableDataInfoModel) {
    const funcID = category.categoryId;
    const dataID = rowData?.dataId || '';
    return of(undefined).pipe(
      concatMap(_ => this.farmService.getFarmFormInfoByFuncID(funcID, rowData?.dataId).pipe(CmsErrorHandler.rxHandleError())),
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
    );
  }

  private takeOffData(category: FarmCategoryInfoModel, rowData: FarmTableDataInfoModel) {
    return this.farmService.takeOffFormData(category.categoryId, rowData.dataId)
      .pipe(
        CmsErrorHandler.rxHandleError(),
        tap(_ => this.modalService.openMessage({ message: `資料已下架 : ${rowData.dataId}` }).subscribe())
      );
  }

  private auditingData(category: FarmCategoryInfoModel, rowData: FarmTableDataInfoModel) {
    return this.modalService.openComponent({
      component: AuditingFarmDataModalComponent,
      componentInitData: {
        funcId: category.categoryId,
        dataId: rowData.dataId,
      }
    });
  }

}
