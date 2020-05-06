import { Component, OnInit } from '@angular/core';
import { AuditingInfo } from '../../../neuxAPI/bean/AuditingInfo';
import { PageInfo } from '../../../neuxAPI/bean/PageInfo';
import { AuditingService } from '../../../service/auditing.service';
import { DialogService } from '../../../ui/dialog/dialog.service';
import { ColDef } from '../../../ui/table/table.interface';
import { Observable, concat } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuditingActionCellComponent, AuditingActionCellCustomEvent } from './component/cell-renderer/auditing-action-cell/auditing-action-cell.component';
import { ApproveAuditingDialogComponent, AuditingApproveStatus } from './component/dialog/approve-auditing-dialog/approve-auditing-dialog.component';

@Component({
  selector: 'cms-auditing',
  templateUrl: './auditing.component.html',
  styleUrls: ['./auditing.component.css']
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
    private _auditingService: AuditingService,
    private _dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this._init().subscribe();
  }

  private _init(): Observable<any> {
    return concat(
      this._getMyAuditings(),
    )
  }

  private _getMyAuditings(): Observable<AuditingInfo[]> {
    return this._auditingService.getAuditingListForManager(this.pageInfo?.page).pipe(
      tap(res => {
        this.pageInfo = res.pageInfo;
        this.auditings = res.datas;
      }),
      map(res => res.datas)
    );
  }

  onCustomEvent(event: AuditingActionCellCustomEvent) {
    if (event instanceof AuditingActionCellCustomEvent) {
      if (event.action === event.EventType.Approve || event.EventType.Refuse) {
        let status: AuditingApproveStatus;
        switch (event.action) {
          case event.EventType.Approve:
            status = AuditingApproveStatus.Approve;
            break;
          case event.EventType.Refuse:
            status = AuditingApproveStatus.Refuse;
            break;
        }
        this._dialogService.openComponent({
          component: ApproveAuditingDialogComponent,
          componentInitData: {
            batch: false,
            status,
          },
        }).subscribe(res => console.warn('res = ', res));
      } else {
        switch (event.action) {
          case event.EventType.PreviewPc:
            break;
          case event.EventType.PreviewPadH:
            break;
          case event.EventType.PreviewPadV:
            break;
          case event.EventType.PreviewMobile:
            break;
        }
      }
    }
  }

  onPageChanged(event: { pageIndex: number }) {
    this.pageInfo.page = event.pageIndex + 1;
    this._init().subscribe();
  }

}
