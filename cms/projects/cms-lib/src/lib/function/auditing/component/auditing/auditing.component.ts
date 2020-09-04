import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuditingService } from '../../../../global/api/service';
import { ModalService } from '../../../ui/modal';
import { ColDef } from '../../../ui/table';
import { AuditingActionCellComponent, AuditingActionCellCustomEvent } from '../auditing-action-cell/auditing-action-cell.component';
import { ApproveAuditingModalComponent, AuditingApproveStatus } from '../approve-auditing-modal/approve-auditing-modal.component';
import { FarmSharedService } from '../../../ui/farm-shared/farm-shared.service';
import { AuditingInfoModel } from '../../../../global/api/data-model/models/auditing-info.model';
import { PreviewInfoType } from '../../../../global/api/data-model/models/preview-info.model';
import { AuditingSubmitRequestModel } from '../../../../global/api/data-model/models/auditing-submit-request.model';
import { CmsErrorHandler } from '../../../../global/error-handling';
import { AuditingGetResponseModel } from 'projects/cms-lib/src/lib/global/api/data-model/models/auditing-get-response.model';

interface Model extends AuditingGetResponseModel {
  checkedData: AuditingInfoModel[];
}

@Component({
  selector: 'cms-auditing',
  templateUrl: './auditing.component.html',
  styleUrls: ['./auditing.component.scss']
})
export class AuditingComponent implements OnInit {

  refreshPage$ = new BehaviorSubject(1);
  auditings$: Observable<Model>;

  // auditings: AuditingInfoModel[];
  // pageInfo: PageInfoModel;
  // checkedData: AuditingInfoModel[] = [];

  colDefs: ColDef<AuditingInfoModel>[] = [
    {
      colId: 'orderId',
      field: 'orderId',
      title: '單號',
      width: '80px',
    },
    {
      colId: 'orderName',
      field: 'orderName',
      title: '資料頁面',
      width: '40%',
    },
    {
      colId: 'createName',
      field: 'createName',
      title: '送審人',
      width: '120px',
    },
    {
      colId: 'submitComment',
      field: 'submitComment',
      title: '意見',
      width: '60%',
    },
    // {
    //   colId: 'start_time',
    //   field: 'start_time',
    //   title: '上架時間',
    //   format: 'DATETIME',
    // },
    // {
    //   colId: 'end_time',
    //   field: 'end_time',
    //   title: '下架時間',
    //   format: 'DATETIME',
    // },
    {
      colId: 'action',
      field: 'action',
      title: '操作',
      cellRenderer: AuditingActionCellComponent,
      width: '80px',
    }
  ];

  constructor(
    private auditingService: AuditingService,
    private modalService: ModalService,
    private farmSharedService: FarmSharedService,
  ) { }

  ngOnInit(): void {
    this.auditings$ = this.refreshPage$.pipe(
      switchMap(page => this.auditingService.getAuditingListForManager(page).pipe(
        CmsErrorHandler.rxHandleError('取得申請清單錯誤'),
        map(res => {
          return {
            pageInfo: res.pageInfo,
            datas: res.datas,
            checkedData: [],
          };
        })
      ))
    );
  }

  onCustomEvent(event: AuditingActionCellCustomEvent, auditings: Model) {
    if (event instanceof AuditingActionCellCustomEvent) {
      if (event.action === event.ActionType.APPROVE || event.action === event.ActionType.REFUSE) {
        let status: AuditingApproveStatus;
        switch (event.action) {
          case event.ActionType.APPROVE:
            status = AuditingApproveStatus.APPROVED;
            break;
          case event.ActionType.REFUSE:
            status = AuditingApproveStatus.REJECT;
            break;
        }
        this.approveAuditing(status, event.data.orderId, auditings);
      } else {
        switch (event.action) {
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
  }

  preview(auditingInfo: AuditingInfoModel) {
    const orderID = auditingInfo.orderId;
    this.auditingService.getPreviewInfo(orderID)
      .pipe(CmsErrorHandler.rxHandleError('取得預覽資料錯誤'))
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

  private approveAuditing(status: AuditingApproveStatus, orderId: number | number[], auditings: Model) {
    this.modalService.openComponent({
      component: ApproveAuditingModalComponent,
      componentInitData: {
        batch: Array.isArray(orderId),
        status,
      },
    }).subscribe((res: AuditingSubmitRequestModel) => {
      if (!res) { return; }
      this.auditingService.approveAuditing(
        orderId,
        res.status,
        res.comment,
      ).pipe(CmsErrorHandler.rxHandleError('審核錯誤')).subscribe(_ => this.refreshPage$.next(auditings.pageInfo.page));
    });
  }

  batchApprove(auditings: Model) {
    this.approveAuditing(AuditingApproveStatus.APPROVED, auditings.checkedData.map(d => d.orderId), auditings);
  }

  batchReject(auditings: Model) {
    this.approveAuditing(AuditingApproveStatus.REJECT, auditings.checkedData.map(d => d.orderId), auditings);
  }

}
