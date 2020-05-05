import { Component, OnInit } from '@angular/core';
import { AuditingService } from '../../../service/auditing.service';
import { Observable, concat } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { MyAuditingInfo } from '../../../neuxAPI/bean/MyAuditingInfo';

import { MyAuditingActionCellComponent, MyAuditingActionCellCustomEvent } from './component/cell-renderer/my-auditing-action-cell/my-auditing-action-cell.component';
import { ColDef } from '../../../ui/table/table.interface';
import { DialogService } from '../../../ui/dialog/dialog.service';
import { MyAuditingDetailDialogComponent } from './component/dialog/my-auditing-detail-dialog/my-auditing-detail-dialog.component';

@Component({
  selector: 'cms-my-auditing',
  templateUrl: './my-auditing.component.html',
  styleUrls: ['./my-auditing.component.css']
})
export class MyAuditingComponent implements OnInit {

  myAuditings: MyAuditingInfo[];

  totalPageSize: number;
  totalRecSize: number;
  page: number = 1;

  colDefs: ColDef[] = [
    {
      colId: 'order_id',
      field: 'order_id',
      title: '序號',
    },
    {
      colId: 'order_name',
      field: 'order_name',
      title: '名稱',
    },
    {
      colId: 'status',
      field: 'status',
      title: '狀態',
    },
    {
      colId: 'start_time',
      field: 'start_time',
      title: '上架時間',
    },
    {
      colId: 'end_time',
      field: 'end_time',
      title: '下架時間',
    },
    {
      colId: 'action',
      field: 'action',
      title: '操作',
      cellRenderer: MyAuditingActionCellComponent,
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

  private _getMyAuditings(): Observable<MyAuditingInfo[]> {
    return this._auditingService.getMyAuditingList(this.page).pipe(
      tap(res => {
        this.totalPageSize = res.pageInfo.totalPageSize;
        this.totalRecSize = res.pageInfo.totalRecSize;
        this.myAuditings = res.datas;
      }),
      map(res => res.datas)
    );
  }

  onCustomEvent(event: MyAuditingActionCellCustomEvent) {
    if (event instanceof MyAuditingActionCellCustomEvent) {
      switch (event.action) {
        case event.EventType.Detail:
          console.warn('event.EventType.Detail');
          this._dialogService.openComponent({
            component: MyAuditingDetailDialogComponent,
            componentInitData: {
              orderId: event.data.order_id
            },
            dialogSetting: {
              width: '100%'
            }
          });
          break;
        case event.EventType.PreviewPc:
          console.warn('event.EventType.PreviewPc');
          break;
        case event.EventType.PreviewPadH:
          console.warn('event.EventType.PreviewPadH');
          break;
        case event.EventType.PreviewPadV:
          console.warn('event.EventType.PreviewPadV');
          break;
        case event.EventType.PreviewMobile:
          console.warn('event.EventType.PreviewMobile');
          break;
      }
    }
  }

}
