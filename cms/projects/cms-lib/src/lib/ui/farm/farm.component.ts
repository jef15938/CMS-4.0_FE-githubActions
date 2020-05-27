import { Component, OnInit, Input, OnDestroy, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FarmService } from '../../service/farm.service';
import { FarmInfo, CmsFarmInfoCategory, CmsFarmTableDataInfo } from '../../type/farm.class';
import { tap, takeUntil, concatMap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FarmTableInfoActionEvent } from './component/farm-table-info/farm-table-info.type';
import { CmsFarmTableDataAction } from '../../type/farm.enum';
import { ModalService } from '../modal/modal.service';
import { FarmFormViewDataModalComponent } from './modal/farm-form-view-data-modal/farm-form-view-data-modal.component';
import { FarmFormModifyDataModalComponent } from './modal/farm-form-modify-data-modal/farm-form-modify-data-modal.component';
import { FarmFormInfoComponent } from './component/farm-form-info/farm-form-info.component';

@Component({
  selector: 'cms-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss']
})
export class FarmComponent implements OnInit, OnDestroy {

  @ViewChild('subContainer', { read: ViewContainerRef }) subContainerViewContainerRef: ViewContainerRef;

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

  private _getCategoryTableInfo(category: CmsFarmInfoCategory) {
    alert('Get Table Info');
    return of(undefined);
  }

  destroySelf() {
    this.destroyMe.next();
  }

  onSelectedTabChange(ev: MatTabChangeEvent) {
    this.activedCategory = this.farm.category[ev.index];
  }

  onSearchInfoNeedQuery(category: CmsFarmInfoCategory, comp: FarmFormInfoComponent) {
    this._getCategoryTableInfo(category).subscribe();
  }

  private _createSub(category: CmsFarmInfoCategory) {
    if (!category) { return; }

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(FarmComponent);
    const viewContainerRef = this.subContainerViewContainerRef;
    viewContainerRef.clear();
    const subComponentRef = viewContainerRef.createComponent(componentFactory);
    subComponentRef.instance.isSub = true;
    subComponentRef.instance.funcId = this.funcId;
    subComponentRef.instance.title = `${this.title ? this.title + ' > ' : ''}${category.category_name}`;
    // subComponentRef.instance.categoryId = this.farm?.category.ca
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
      case CmsFarmTableDataAction.AUDITING:
        this._auditData(category, event.rowData);
        break;
    }
  }

  private _openViewDataModal(category: CmsFarmInfoCategory, rowData: CmsFarmTableDataInfo) {
    const farmFormInfo = this.farm.detailInfo;
    const title = `預覽 : ${rowData.data_id}`;

    // TODO: call api : GetFarmDetailInfo
    of(undefined).pipe(
      concatMap(_ => {
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

    const farmFormInfo = category.searchInfo;
    const title = action === 'create' ? '新增' : `修改 : ${rowData.data_id}`;

    // TODO: call api : GetFarmDetailInfo
    of(undefined).pipe(
      concatMap(_ => {
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

  private _auditData(category: CmsFarmInfoCategory, rowData: CmsFarmTableDataInfo) {
    alert(`Audit : ${rowData.data_id}`);
    this._getCategoryTableInfo(category).subscribe();
  }

}
