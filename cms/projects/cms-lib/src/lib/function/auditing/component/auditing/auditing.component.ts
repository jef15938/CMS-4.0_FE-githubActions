import { Component, OnInit } from '@angular/core';
import { Observable, concat } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuditingService } from '../../../../global/api/service';
import { ModalService } from '../../../ui/modal';
import { ColDef } from '../../../ui/table';
import { AuditingActionCellComponent, AuditingActionCellCustomEvent } from '../auditing-action-cell/auditing-action-cell.component';
import { ApproveAuditingModalComponent, AuditingApproveStatus } from '../approve-auditing-modal/approve-auditing-modal.component';
import { FarmSharedService } from '../../../ui/farm-shared/farm-shared.service';
import { AuditingInfoModel } from '../../../../global/api/data-model/models/auditing-info.model';
import { PageInfoModel } from '../../../../global/api/data-model/models/page-info.model';
import { PreviewInfoType } from '../../../../global/api/data-model/models/preview-info.model';
import { AuditingSubmitRequestModel } from '../../../../global/api/data-model/models/auditing-submit-request.model';

@Component({
  selector: 'cms-auditing',
  templateUrl: './auditing.component.html',
  styleUrls: ['./auditing.component.scss']
})
export class AuditingComponent implements OnInit {

  auditings: AuditingInfoModel[];
  pageInfo: PageInfoModel;

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
    this.init().subscribe();
  }

  private init(): Observable<any> {
    return concat(
      this.getMyAuditings(),
    );
  }

  private getMyAuditings(): Observable<AuditingInfoModel[]> {
    return this.auditingService.getAuditingListForManager(this.pageInfo?.page).pipe(
      tap(res => {
        this.pageInfo = res.pageInfo;
        this.auditings = res.datas;
      }),
      map(res => res.datas)
    );
  }

  onCustomEvent(event: AuditingActionCellCustomEvent) {
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
        this.modalService.openComponent({
          component: ApproveAuditingModalComponent,
          componentInitData: {
            batch: false,
            status,
          },
        }).subscribe((res: AuditingSubmitRequestModel) => {
          if (!res) { return; }
          this.auditingService.approveAuditing(
            event.data.orderId,
            res.status,
            res.comment,
          ).subscribe(_ => this.getMyAuditings().subscribe());
        });
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
    this.auditingService.getPreviewInfo(orderID).subscribe(previewInfo => {
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
    this.pageInfo.page = event.pageIndex + 1;
    this.init().subscribe();
  }

}
