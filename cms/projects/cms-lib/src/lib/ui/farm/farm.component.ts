import { Component, OnInit, Input, OnDestroy, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FarmService } from '../../service/farm.service';
import { FarmInfo, CmsFarmInfoCategory, CmsFarmTableDataInfo, CmsFarmFormInfo } from '../../type/farm.class';
import { tap, takeUntil, concatMap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FarmTableInfoActionEvent } from './component/farm-table-info/farm-table-info.type';
import { CmsFarmTableDataAction } from '../../type/farm.enum';
import { ModalService } from '../modal/modal.service';
import { FarmFormViewDataModalComponent } from './modal/farm-form-view-data-modal/farm-form-view-data-modal.component';
import { FarmFormModifyDataModalComponent } from './modal/farm-form-modify-data-modal/farm-form-modify-data-modal.component';
import { FarmFormComp } from './farm.interface';

@Component({
  selector: 'cms-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss']
})
export class FarmComponent implements OnInit, OnDestroy {

  @ViewChild('subContainer', { read: ViewContainerRef }) subContainerViewContainerRef: ViewContainerRef;

  private _farmFormInfoComponentMap = new Map<CmsFarmInfoCategory, FarmFormComp>();

  @Input() title: string;
  @Input() categoryName: string;
  @Input() funcId: string;
  @Input() categoryId: string;
  @Input() isSub = false;

  farm: FarmInfo;

  activedCategory: CmsFarmInfoCategory;

  subComponentRef: ComponentRef<FarmComponent>;

  destroyMe = new Subject();
  private _destroy$ = new Subject();

  constructor(
    private _farmService: FarmService,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this._getFarm().subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  private _getFarm() {
    return this._farmService.getFarmByFuncID(this.funcId).pipe(
      tap(farm => {
        this.farm = farm;
        this.activedCategory = this.farm?.category[0];
      }),
    )
  }

  private _getCategoryTableInfo(category: CmsFarmInfoCategory, page = 1) {

    const farmInfo: CmsFarmFormInfo = this._farmFormInfoComponentMap.get(category)?.getFarmInfo();
    // TODO: 查詢 table 時帶 search 表單
    console.warn('farmInfo = ', farmInfo);
    return this._farmService.getFarmTableInfoByFuncID(category.category_id, page).pipe(
      tap(farmTableInfo => {
        category.tableInfo = farmTableInfo;
      })
    );
  }

  destroySelf() {
    this.destroyMe.next();
  }

  onTablePageChange(category: CmsFarmInfoCategory, page: number) {
    this._getCategoryTableInfo(category, page).subscribe();
  }

  onSelectedTabChange(ev: MatTabChangeEvent) {
    this.activedCategory = this.farm.category[ev.index];
  }

  onSearchInfoFarmFormInfoCompEmit(category: CmsFarmInfoCategory, comp: FarmFormComp) {
    this._farmFormInfoComponentMap.set(category, comp);
  }

  onSearchInfoNeedQuery(category: CmsFarmInfoCategory) {
    this._getCategoryTableInfo(category).subscribe();
  }

  private _createSub(category: CmsFarmInfoCategory) {
    if (!category) { return; }

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(FarmComponent);
    const viewContainerRef = this.subContainerViewContainerRef;
    viewContainerRef.clear();
    this.subComponentRef = undefined;

    const subComponentRef = viewContainerRef.createComponent(componentFactory);
    subComponentRef.instance.isSub = true;
    subComponentRef.instance.funcId = category.category_id;
    subComponentRef.instance.title = `${this.title || ''}${this.title ? ' > ' : ''}${category.category_name}`;
    this.subComponentRef = subComponentRef;
    this.subComponentRef.instance.destroyMe.pipe(
      takeUntil(this._destroy$),
      tap(_ => this._destroySub()),
    ).subscribe();
  }

  private _destroySub() {
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
    console.warn('onTableActionClick() category = ', category);
    console.warn('onTableActionClick() event = ', event);

    switch (event.action) {
      case CmsFarmTableDataAction.DETAIL:
        this._createSub(category);
        break;
      case CmsFarmTableDataAction.PREVIEW:
        this._openViewDataModal(category, event.rowData);
        break;
      case CmsFarmTableDataAction.CREATE:
        this._openModifyDataModal('create', category);
        break;
      case CmsFarmTableDataAction.MODIFY:
        this._openModifyDataModal('edit', category, event.rowData);
        break;
      case CmsFarmTableDataAction.DELETE:
        this._deleteData(category, event.rowData);
        break;
    }
  }

  private _openViewDataModal(category: CmsFarmInfoCategory, rowData: CmsFarmTableDataInfo) {
    const title = `預覽 : ${rowData.data_id}`;
    of(undefined).pipe(
      concatMap(_ => this._farmService.getFarmDetailInfoByFarmID(category.category_id, rowData.data_id)),
      concatMap(farmFormInfo => {
        return this._modalService.openComponent({
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

  private _openModifyDataModal(action: 'create' | 'edit', category: CmsFarmInfoCategory, rowData?: CmsFarmTableDataInfo) {
    if (action === 'edit' && !rowData) {
      alert('資料異常');
      return;
    }
    const title = action === 'create' ? '新增' : `修改 : ${rowData.data_id}`;
    of(undefined).pipe(
      concatMap(_ => this._farmService.getFarmFormInfoByFuncID(category.category_id, rowData?.data_id)),
      concatMap(farmFormInfo => {
        return this._modalService.openComponent({
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
        this._getCategoryTableInfo(category).subscribe();
      }
    });
  }

  private _deleteData(category: CmsFarmInfoCategory, rowData: CmsFarmTableDataInfo) {
    alert(`Delete : ${rowData.data_id}`);
    this._getCategoryTableInfo(category).subscribe();
  }

}
