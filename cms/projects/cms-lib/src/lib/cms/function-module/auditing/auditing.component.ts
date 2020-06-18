import { Component, OnInit } from '@angular/core';
import { AuditingInfo } from '../../../neuxAPI/bean/AuditingInfo';
import { PageInfo } from '../../../neuxAPI/bean/PageInfo';
import { AuditingService } from '../../../service/auditing.service';
import { ModalService } from '../../../ui/modal/modal.service';
import { ColDef } from '../../../ui/table/table.interface';
import { Observable, concat } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuditingActionCellComponent, AuditingActionCellCustomEvent } from './component/cell-renderer/auditing-action-cell/auditing-action-cell.component';
import { ApproveAuditingModalComponent, AuditingApproveStatus } from './component/modal/approve-auditing-modal/approve-auditing-modal.component';

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
    },
    {
      colId: 'order_name',
      field: 'order_name',
      title: '資料頁面',
    },
    {
      colId: 'create_name',
      field: 'create_name',
      title: '送審人',
    },
    {
      colId: 'submit_comment',
      field: 'submit_comment',
      title: '意見',
    },
    // {
    //   colId: 'start_time',
    //   field: 'start_time',
    //   title: '上架時間',
    // },
    // {
    //   colId: 'end_time',
    //   field: 'end_time',
    //   title: '下架時間',
    // },
    {
      colId: 'action',
      field: 'action',
      title: '操作',
      cellRenderer: AuditingActionCellComponent,
    }
  ];

  constructor(
    private auditingService: AuditingService,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.init().subscribe();
  }

  private init(): Observable<any> {
    return concat(
      this.getMyAuditings(),
    )
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
      if (event.action === event.ActionType.Approve || event.ActionType.Refuse) {
        let status: AuditingApproveStatus;
        switch (event.action) {
          case event.ActionType.Approve:
            status = AuditingApproveStatus.Approve;
            break;
          case event.ActionType.Refuse:
            status = AuditingApproveStatus.Reject;
            break;
        }
        this.modalService.openComponent({
          component: ApproveAuditingModalComponent,
          componentInitData: {
            batch: false,
            status,
          },
        }).subscribe(res => console.warn('res = ', res));
      } else {
        switch (event.action) {
          case event.ActionType.PreviewPc:
            break;
          case event.ActionType.PreviewPadH:
            break;
          case event.ActionType.PreviewPadV:
            break;
          case event.ActionType.PreviewMobile:
            break;
        }
      }
    }
  }

  onPageChanged(event: { pageIndex: number }) {
    this.pageInfo.page = event.pageIndex + 1;
    this.init().subscribe();
  }

}
