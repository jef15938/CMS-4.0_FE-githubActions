import {
  Component, OnInit, Input, OnDestroy, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  OnChanges, SimpleChanges
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subject, of, throwError } from 'rxjs';
import { tap, takeUntil, concatMap } from 'rxjs/operators';
import { FarmService } from '../../../global/api/service';
import { ModalService } from '../modal';
import { FarmFormComp } from './farm-shared.interface';
import { FarmTableInfoActionEvent } from './component/farm-table-info/farm-table-info.type';
import { FarmFormModifyDataModalComponent } from './modal/farm-form-modify-data-modal/farm-form-modify-data-modal.component';
import { AuditingFarmDataModalComponent } from './modal/auditing-farm-data-modal/auditing-farm-data-modal.component';
import { FarmSharedService } from './farm-shared.service';
import { PreviewInfoType } from '../../../global/api/data-model/models/preview-info.model';
import { FarmCategoryInfoModel } from '../../../global/api/data-model/models/farm-category-info.model';
import { FarmInfoGetResponseModel } from '../../../global/api/data-model/models/farm-info-get-response.model';
import { FarmTableDataInfoAction, FarmTableDataInfoModel } from '../../../global/api/data-model/models/farm-table-data-info.model';
import { CmsErrorHandler } from '../../../global/error-handling';

@Component({
  selector: 'cms-farm-shared',
  templateUrl: './farm-shared.component.html',
  styleUrls: ['./farm-shared.component.scss']
})
export class FarmSharedComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('subContainer', { read: ViewContainerRef }) subContainerViewContainerRef: ViewContainerRef;

  private searchInfoFormComponentMap = new Map<FarmCategoryInfoModel, FarmFormComp>();

  // @Input() title: string;
  @Input() categoryName: string;
  @Input() categoryId: string;
  @Input() isSub = false;

  @Input() farm: FarmInfoGetResponseModel;

  activedCategory: FarmCategoryInfoModel;

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
      this.currentTablePage = 1;
    }
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  private getCategoryTableInfo(category: FarmCategoryInfoModel) {
    const page = this.currentTablePage;
    return of(undefined).pipe(
      concatMap(_ => this.searchInfoFormComponentMap.get(category)?.requestFormInfo() || throwError('No Category in Map.')),
      concatMap(searchFormInfo => {
        const queryParams: { [key: string]: string } = {};
        searchFormInfo.columns.forEach(column => {
          if (column.value) { queryParams[column.columnId] = `${column.value}`; }
        });
        return this.farmService.getFarmTableInfoByFuncID(category.categoryId, page, queryParams)
          .pipe(
            CmsErrorHandler.rxHandleError(),
            tap(farmTableInfo => {
              category.tableInfo = farmTableInfo;
            })
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

  onSelectedTabChange(ev: MatTabChangeEvent) {
    this.activedCategory = this.farm.category[ev.index];
  }

  onSearchInfoFarmFormInfoCompEmit(category: FarmCategoryInfoModel, comp: FarmFormComp) {
    this.searchInfoFormComponentMap.set(category, comp);
  }

  onSearchInfoNeedQuery(category: FarmCategoryInfoModel) {
    this.currentTablePage = 1;
    this.getCategoryTableInfo(category).subscribe();
  }

  private seeMore(category: FarmCategoryInfoModel, rowData: FarmTableDataInfoModel) {
    if (!category) { return; }

    this.farmService.getFarmByFuncID(rowData.moreFuncId, rowData.dataId, category.categoryId)
      .pipe(CmsErrorHandler.rxHandleError())
      .subscribe(farm => {
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

  onTableActionClick(category: FarmCategoryInfoModel, event: FarmTableInfoActionEvent) {
    switch (event.action) {
      case FarmTableDataInfoAction.CREATE:
        this.openModifyDataModal('create', category);
        break;
      case FarmTableDataInfoAction.MODIFY:
        this.openModifyDataModal('edit', category, event.rowData);
        break;
      case FarmTableDataInfoAction.DELETE:
        this.deleteData(category, event.rowData);
        break;
      case FarmTableDataInfoAction.PUBLISH:
        this.auditingData(category, event.rowData);
        break;
      case FarmTableDataInfoAction.OFF:
        this.takeOffData(category, event.rowData);
        break;
      case FarmTableDataInfoAction.PREVIEW:
        this.preview(category, event.rowData);
        break;
      case FarmTableDataInfoAction.MORE:
        this.seeMore(category, event.rowData);
        break;
    }
  }

  private preview(category: FarmCategoryInfoModel, rowData: FarmTableDataInfoModel) {
    const funcID = category.categoryId;
    const dataID = rowData.dataId;
    this.farmService.getPreviewInfo(funcID, dataID)
      .pipe(CmsErrorHandler.rxHandleError())
      .subscribe(previewInfo => {
        switch (previewInfo.previewType) {
          case PreviewInfoType.ONE_PAGE:
            window.open(previewInfo.url, '_blank', 'noopener=yes,noreferrer=yes');
            break;
          case PreviewInfoType.FARM:
            this.farmSharedService.openFarmPreview(previewInfo.funcId, previewInfo.dataId).subscribe();
            break;
        }
      });
  }

  private openModifyDataModal(action: 'create' | 'edit', category: FarmCategoryInfoModel, rowData?: FarmTableDataInfoModel) {
    const funcID = category.categoryId;
    const dataID = rowData?.dataId || '';
    of(undefined).pipe(
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
    ).subscribe(confirm => {
      if (confirm) {
        this.getCategoryTableInfo(category).subscribe();
      }
    });
  }

  private takeOffData(category: FarmCategoryInfoModel, rowData: FarmTableDataInfoModel) {
    this.farmService.takeOffFormData(category.categoryId, rowData.dataId)
      .pipe(CmsErrorHandler.rxHandleError())
      .subscribe(_ => {
        this.modalService.openMessage({ message: `資料已下架 : ${rowData.dataId}` }).subscribe();
        this.getCategoryTableInfo(category).subscribe();
      });
  }

  private deleteData(category: FarmCategoryInfoModel, rowData: FarmTableDataInfoModel) {
    // TODO: 刪除 Farm Table 資料
    this.modalService.openMessage({ message: '功能準備中' }).subscribe();
  }

  private auditingData(category: FarmCategoryInfoModel, rowData: FarmTableDataInfoModel) {
    this.modalService.openComponent({
      component: AuditingFarmDataModalComponent,
      componentInitData: {
        funcId: category.categoryId,
        dataId: rowData.dataId,
      }
    }).subscribe(confirm => {
      if (confirm) {
        this.getCategoryTableInfo(category).subscribe();
      }
    });
  }

}
