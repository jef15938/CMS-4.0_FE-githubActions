import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase } from 'projects/cms-lib/src/lib/ui/modal/custom-modal-base';
import { AuditingService } from 'projects/cms-lib/src/lib/service/auditing.service';
import { MyAuditingDetailInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/MyAuditingDetailInfo';
import { tap } from 'rxjs/operators';
import { ColDef } from 'projects/cms-lib/src/lib/ui/table/table.interface';

@Component({
  selector: 'cms-my-auditing-detail-modal',
  templateUrl: './my-auditing-detail-modal.component.html',
  styleUrls: ['./my-auditing-detail-modal.component.css']
})
export class MyAuditingDetailModalComponent extends CustomModalBase implements OnInit {
  title = '審核紀錄';
  actions;

  @Input() orderId: number;
  myAuditingDetail: MyAuditingDetailInfo[];

  colDefs: ColDef[] = [
    {
      colId: 'status',
      field: 'status',
      title: '狀態',
    },
    {
      colId: 'auditing_group_name',
      field: 'auditing_group_name',
      title: '群組',
    },
    {
      colId: 'auditing_dept_name',
      field: 'auditing_dept_name',
      title: '部門',
    },
    {
      colId: 'auditing_name',
      field: 'auditing_name',
      title: '主管',
    },
    {
      colId: 'auditing_stage',
      field: 'auditing_stage',
      title: '階段',
    },

    {
      colId: 'auditing_time',
      field: 'auditing_time',
      title: '時間',
    },
    {
      colId: 'auditing_comment',
      field: 'auditing_comment',
      title: '意見',
    },
  ];

  constructor(
    private _auditingService: AuditingService,
  ) {
    super();
  }

  ngOnInit(): void {
    this._auditingService.getMyAuditingDetail(this.orderId).pipe(
      tap(myAuditingDetail => this.myAuditingDetail = myAuditingDetail)
    ).subscribe();
  }

}
