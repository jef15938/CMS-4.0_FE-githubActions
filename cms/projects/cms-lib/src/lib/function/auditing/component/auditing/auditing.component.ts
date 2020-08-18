import { Component, OnInit } from '@angular/core';
import { Observable, concat } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuditingService } from '../../../../global/api/service';
import { AuditingInfo } from '../../../../global/api/neuxAPI/bean/AuditingInfo';
import { PageInfo } from '../../../../global/api/neuxAPI/bean/PageInfo';
import { ModalService } from '../../../ui/modal';
import { ColDef } from '../../../ui/table';
import { AuditingActionCellComponent, AuditingActionCellCustomEvent } from '../auditing-action-cell/auditing-action-cell.component';
import { ApproveAuditingModalComponent, AuditingApproveStatus } from '../approve-auditing-modal/approve-auditing-modal.component';
import { AuditingSubmitRequest } from '../../../../global/api/neuxAPI/bean/AuditingSubmitRequest';
import { PreviewInfoType } from '../../../../global/api/neuxAPI/bean/PreviewInfo';
import { FarmSharedService } from '../../../ui/farm-shared/farm-shared.service';

@Component({
  selector: 'cms-auditing',
  templateUrl: './auditing.component.html',
  styleUrls: ['./auditing.component.scss']
})
export class AuditingComponent implements OnInit {

  auditings: AuditingInfo[];
  pageInfo: PageInfo;

  colDefs: ColDef[] = [
    {
      colId: 'order_id',
      field: 'order_id',
      title: '單號',
      width: '80px',
    },
    {
      colId: 'order_name',
      field: 'order_name',
      title: '資料頁面',
      width: '40%',
    },
    {
      colId: 'create_name',
      field: 'create_name',
      title: '送審人',
      width: '120px',
    },
    {
      colId: 'submit_comment',
      field: 'submit_comment',
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

  private getMyAuditings(): Observable<AuditingInfo[]> {
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
        }).subscribe((res: AuditingSubmitRequest) => {
          if (!res) { return; }
          this.auditingService.approveAuditing(
            event.data.order_id,
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

  preview(auditingInfo: AuditingInfo) {
    const orderID = auditingInfo.order_id;
    this.auditingService.getPreviewInfo(orderID).subscribe(previewInfo => {
      switch (previewInfo.preview_type) {
        case PreviewInfoType.ONE_PAGE:
          window.open(previewInfo.url, '_blank', 'noopener=yes,noreferrer=yes');
          break;
        case PreviewInfoType.FARM:
          this.farmSharedService.openFarmPreview(previewInfo.func_id, previewInfo.data_id).subscribe();
          break;
      }
    });
  }

  onPageChanged(event: { pageIndex: number }) {
    this.pageInfo.page = event.pageIndex + 1;
    this.init().subscribe();
  }

}
