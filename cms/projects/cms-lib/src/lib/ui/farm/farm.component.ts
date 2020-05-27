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

@Component({
  selector: 'cms-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss']
})
export class FarmComponent implements OnInit, OnDestroy {

  @ViewChild('subContainer', { read: ViewContainerRef }) subContainerViewContainerRef: ViewContainerRef;

  @Input() topLevel: string;
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

  destroySelf() {
    this.destroyMe.next();
  }

  onSelectedTabChange(ev: MatTabChangeEvent) {
    this.activedCategory = this.farm.category[ev.index];
  }

  createSub(category: CmsFarmInfoCategory) {
    if (!category) { return; }

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(FarmComponent);
    const viewContainerRef = this.subContainerViewContainerRef;
    viewContainerRef.clear();
    const subComponentRef = viewContainerRef.createComponent(componentFactory);
    subComponentRef.instance.isSub = true;
    subComponentRef.instance.funcId = this.funcId;
    subComponentRef.instance.topLevel = `${this.topLevel ? this.topLevel + ' > ' : ''}${category.category_name}`;
    // subComponentRef.instance.categoryId = this.farm?.category.ca
    this.subComponentRef = subComponentRef;
    this.subComponentRef.instance.destroyMe.pipe(
      takeUntil(this._destroy$),
      tap(_ => this.destroySub()),
    ).subscribe();
  }

  destroySub() {
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
        this.createSub(category);
        break;
      case CmsFarmTableDataAction.PREVIEW:
        this.openViewDataModal(category, event.rowData);
        break;
      case CmsFarmTableDataAction.MODIFY:
        this.openModifyDataModal(category, event.rowData);
        break;
      case CmsFarmTableDataAction.DELETE:
        this.deleteData(category, event.rowData);
        break;
      case CmsFarmTableDataAction.AUDITING:
        this.auditData(category, event.rowData);
        break;
    }
  }

  deleteData(category: CmsFarmInfoCategory, rowData: CmsFarmTableDataInfo) {
    alert(`Delete : ${rowData.data_id}`);
  }

  auditData(category: CmsFarmInfoCategory, rowData: CmsFarmTableDataInfo) {
    alert(`Audit : ${rowData.data_id}`);
  }

  openViewDataModal(category: CmsFarmInfoCategory, rowData: CmsFarmTableDataInfo) {
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

  openModifyDataModal(category: CmsFarmInfoCategory, rowData: CmsFarmTableDataInfo) {
    const farmFormInfo = category.searchInfo;
    const title = `修改 : ${rowData.data_id}`;

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
    ).subscribe();
  }

}
