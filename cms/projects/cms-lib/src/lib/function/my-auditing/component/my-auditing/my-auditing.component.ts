import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuditingService } from '../../../../global/api/service';
import { ColDef } from '../../../ui/table';
import { ModalService } from '../../../ui/modal';
import { MyAuditingActionCellComponent, MyAuditingActionCellCustomEvent } from '../my-auditing-action-cell/my-auditing-action-cell.component';
import { MyAuditingDetailModalComponent } from '../my-auditing-detail-modal/my-auditing-detail-modal.component';
import { FarmSharedService } from '../../../ui/farm-shared/farm-shared.service';
import { PreviewInfoType } from '../../../../global/api/data-model/models/preview-info.model';
import { MyAuditingInfoModel } from '../../../../global/api/data-model/models/my-auditing-info.model';
import { CmsErrorHandler } from '../../../../global/error-handling';
import { MyAuditingGetResponseModel } from '../../../../global/api/data-model/models/my-auditing-get-response.model';

@Component({
  selector: 'cms-my-auditing',
  templateUrl: './my-auditing.component.html',
  styleUrls: ['./my-auditing.component.scss']
})
export class MyAuditingComponent implements OnInit {

  refreshPage$ = new BehaviorSubject(1);
  myAuditings$: Observable<MyAuditingGetResponseModel>;

  colDefs: ColDef<MyAuditingInfoModel>[] = [
    {
      colId: 'orderId',
      field: 'orderId',
      title: '序號',
      width: '80px',
    },
    {
      colId: 'orderName',
      field: 'orderName',
      title: '名稱',
    },
    {
      colId: 'status',
      field: 'status',
      title: '狀態',
      width: '100px',
    },
    {
      colId: 'startTime',
      field: 'startTime',
      title: '上架時間',
      format: 'DATETIME',
      width: '100px',
    },
    {
      colId: 'endTime',
      field: 'endTime',
      title: '下架時間',
      format: 'DATETIME',
      width: '100px',
    },
    {
      colId: 'action',
      field: 'action',
      title: '操作',
      cellRenderer: MyAuditingActionCellComponent,
      width: '80px',
    }
  ];

  constructor(
    private auditingService: AuditingService,
    private modalService: ModalService,
    private farmSharedService: FarmSharedService,
  ) { }

  ngOnInit(): void {
    this.myAuditings$ = this.refreshPage$.pipe(
      switchMap(page => this.auditingService.getMyAuditingList(page).pipe(
        CmsErrorHandler.rxHandleError(),
      ))
    );
  }

  onCustomEvent(event: MyAuditingActionCellCustomEvent) {
    if (event instanceof MyAuditingActionCellCustomEvent) {
      switch (event.action) {
        case event.ActionType.DETAIL:
          this.modalService.openComponent({
            component: MyAuditingDetailModalComponent,
            componentInitData: {
              orderId: event.data.orderId
            }
          });
          break;
        case event.ActionType.PREVIEW:
          this.preview(event.data);
          break;
        // case event.ActionType.PreviewPc:
        //   break;
        // case event.ActionType.PreviewPadH:
        //   break;
        // case event.ActionType.PreviewPadV:
        //   break;
        // case event.ActionType.PreviewMobile:
        //   break;
      }
    }
  }

  preview(auditingInfo: MyAuditingInfoModel) {
    const orderID = auditingInfo.orderId;
    this.auditingService.getPreviewInfo(orderID)
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

  onPageChanged(event: { pageIndex: number }) {
    this.refreshPage$.next(event.pageIndex + 1);
  }

}
