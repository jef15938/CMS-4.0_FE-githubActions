import { Component, OnInit, Input, OnDestroy, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subject, of, throwError, NEVER } from 'rxjs';
import { tap, takeUntil, concatMap, catchError } from 'rxjs/operators';
import { FarmService } from './../../../global/api/service';
import { FarmInfo, CmsFarmInfoCategory, CmsFarmTableDataInfo } from './../../../global/model';
import { CmsFarmTableDataAction } from './../../../global/enum';
import { ModalService } from '../modal';
import { FarmFormComp } from './farm.interface';
import { FarmTableInfoActionEvent } from './component/farm-table-info/farm-table-info.type';
import { FarmFormViewDataModalComponent } from './modal/farm-form-view-data-modal/farm-form-view-data-modal.component';
import { FarmFormModifyDataModalComponent } from './modal/farm-form-modify-data-modal/farm-form-modify-data-modal.component';

@Component({
  selector: 'cms-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss']
})
export class FarmComponent implements OnInit, OnDestroy {

  @ViewChild('subContainer', { read: ViewContainerRef }) subContainerViewContainerRef: ViewContainerRef;

  private searchInfoFormComponentMap = new Map<CmsFarmInfoCategory, FarmFormComp>();

  @Input() title: string;
  @Input() categoryName: string;
  @Input() funcId: string;
  @Input() categoryId: string;
  @Input() isSub = false;

  farm: FarmInfo;

  activedCategory: CmsFarmInfoCategory;

  subComponentRef: ComponentRef<FarmComponent>;

  destroyMe = new Subject();
  private destroy$ = new Subject();

  constructor(
    private farmService: FarmService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.getFarm().subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  private getFarm() {
    return this.farmService.getFarmByFuncID(this.funcId).pipe(
      tap(farm => {
        this.farm = farm;
        this.activedCategory = this.farm?.category[0];
      }),
    );
  }

  private getCategoryTableInfo(category: CmsFarmInfoCategory, page = 1) {
    return of(undefined).pipe(
      concatMap(_ => this.searchInfoFormComponentMap.get(category)?.requestFormInfo() || throwError('No Category in Map.')),
      concatMap(searchFormInfo => { // TODO: 查詢 table 時帶 search 表單
        return this.farmService.getFarmTableInfoByFuncID(category.category_id, page).pipe(
          tap(farmTableInfo => {
            category.tableInfo = farmTableInfo;
          })
        );
      }),
      catchError(err => {
        console.error('err = ', err);
        return NEVER;
      }),
    );
  }

  destroySelf() {
    this.destroyMe.next();
  }

  onTablePageChange(category: CmsFarmInfoCategory, page: number) {
    this.getCategoryTableInfo(category, page).subscribe();
  }

  onSelectedTabChange(ev: MatTabChangeEvent) {
    this.activedCategory = this.farm.category[ev.index];
  }

  onSearchInfoFarmFormInfoCompEmit(category: CmsFarmInfoCategory, comp: FarmFormComp) {
    this.searchInfoFormComponentMap.set(category, comp);
  }

  onSearchInfoNeedQuery(category: CmsFarmInfoCategory) {
    this.getCategoryTableInfo(category).subscribe();
  }

  private createSub(category: CmsFarmInfoCategory) {
    if (!category) { return; }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FarmComponent);
    const viewContainerRef = this.subContainerViewContainerRef;
    viewContainerRef.clear();
    this.subComponentRef = undefined;

    const subComponentRef = viewContainerRef.createComponent(componentFactory);
    subComponentRef.instance.isSub = true;
    subComponentRef.instance.funcId = category.category_id;
    subComponentRef.instance.title = `${this.title || ''}${this.title ? ' > ' : ''}${category.category_name}`;
    this.subComponentRef = subComponentRef;
    this.subComponentRef.instance.destroyMe.pipe(
      takeUntil(this.destroy$),
      tap(_ => this.destroySub()),
    ).subscribe();
  }

  private destroySub() {
    try {
      this.subComponentRef.instance.destroyMe.unsubscribe();
    } catch (error) {
      console.error('destroySub() destroyMe.unsubscribe()', error);
    }
    try {
      this.subComponentRef.destroy();
    } catch (error) {
      console.error('destroySub() subComponentRef.destroy()', error);
    }
    this.subContainerViewContainerRef.clear();
    this.subComponentRef = undefined;
  }

  onTableActionClick(category: CmsFarmInfoCategory, event: FarmTableInfoActionEvent) {
    switch (event.action) {
      case CmsFarmTableDataAction.DETAIL:
        this.createSub(category);
        break;
      case CmsFarmTableDataAction.PREVIEW:
        this.openViewDataModal(category, event.rowData);
        break;
      case CmsFarmTableDataAction.CREATE:
        this.openModifyDataModal('create', category);
        break;
      case CmsFarmTableDataAction.MODIFY:
        this.openModifyDataModal('edit', category, event.rowData);
        break;
      case CmsFarmTableDataAction.DELETE:
        this.deleteData(category, event.rowData);
        break;
    }
  }

  private openViewDataModal(category: CmsFarmInfoCategory, rowData: CmsFarmTableDataInfo) {
    const title = `預覽 : ${rowData.data_id}`;
    of(undefined).pipe(
      concatMap(_ => this.farmService.getFarmDetailInfoByFuncID(category.category_id, rowData.data_id)),
      concatMap(farmFormInfo => {
        return this.modalService.openComponent({
          component: FarmFormViewDataModalComponent,
          componentInitData: {
            title,
            farmFormInfo,
          },
          modalSetting: {
            width: '1440px',
          }
        });
      })
    ).subscribe();
  }

  private openModifyDataModal(action: 'create' | 'edit', category: CmsFarmInfoCategory, rowData?: CmsFarmTableDataInfo) {
    if (action === 'edit' && !rowData) {
      alert('資料異常');
      return;
    }
    const title = action === 'create' ? '新增' : `修改 : ${rowData.data_id}`;
    of(undefined).pipe(
      concatMap(_ => this.farmService.getFarmFormInfoByFuncID(category.category_id, rowData?.data_id)),
      concatMap(farmFormInfo => {
        return this.modalService.openComponent({
          component: FarmFormModifyDataModalComponent,
          componentInitData: {
            title,
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

  private deleteData(category: CmsFarmInfoCategory, rowData: CmsFarmTableDataInfo) {
    alert(`Delete : ${rowData.data_id}`);
    this.getCategoryTableInfo(category).subscribe();
  }

}
