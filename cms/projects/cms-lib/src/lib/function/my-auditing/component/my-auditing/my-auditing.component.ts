import { Component, OnInit } from '@angular/core';
import { Observable, concat } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { MyAuditingInfo } from '../../../../global/api/neuxAPI/bean/MyAuditingInfo';
import { PageInfo } from '../../../../global/api/neuxAPI/bean/PageInfo';
import { AuditingService } from '../../../../global/api/service';
import { ColDef } from '../../../ui/table';
import { ModalService } from '../../../ui/modal';
import { MyAuditingActionCellComponent, MyAuditingActionCellCustomEvent } from '../my-auditing-action-cell/my-auditing-action-cell.component';
import { MyAuditingDetailModalComponent } from '../my-auditing-detail-modal/my-auditing-detail-modal.component';
import { PreviewInfoType } from '../../../../global/api/neuxAPI/bean/PreviewInfo';

@Component({
  selector: 'cms-my-auditing',
  templateUrl: './my-auditing.component.html',
  styleUrls: ['./my-auditing.component.scss']
})
export class MyAuditingComponent implements OnInit {

  myAuditings: MyAuditingInfo[];
  pageInfo: PageInfo;

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
      format: 'DATETIME',
    },
    {
      colId: 'end_time',
      field: 'end_time',
      title: '下架時間',
      format: 'DATETIME',
    },
    {
      colId: 'action',
      field: 'action',
      title: '操作',
      cellRenderer: MyAuditingActionCellComponent,
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
    );
  }

  private getMyAuditings(): Observable<MyAuditingInfo[]> {
    return this.auditingService.getMyAuditingList(this.pageInfo?.page).pipe(
      tap(res => {
        this.pageInfo = res.pageInfo;
        this.myAuditings = res.datas;
      }),
      map(res => res.datas)
    );
  }

  onCustomEvent(event: MyAuditingActionCellCustomEvent) {
    if (event instanceof MyAuditingActionCellCustomEvent) {
      switch (event.action) {
        case event.ActionType.DETAIL:
          this.modalService.openComponent({
            component: MyAuditingDetailModalComponent,
            componentInitData: {
              orderId: event.data.order_id
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

  preview(auditingInfo: MyAuditingInfo) {
    const orderID = auditingInfo.order_id;
    this.auditingService.getPreviewInfo(orderID).subscribe(previewInfo => {
      switch (previewInfo.preview_type) {
        case PreviewInfoType.ONE_PAGE:
          window.open(previewInfo.url, '_blank', 'noopener=yes,noreferrer=yes');
          break;
        case PreviewInfoType.FARM:
          break;
      }
    });
  }

  onPageChanged(event: { pageIndex: number }) {
    this.pageInfo.page = event.pageIndex + 1;
    this.init().subscribe();
  }

}
