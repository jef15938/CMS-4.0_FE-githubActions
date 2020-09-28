import { Component, OnInit, Input } from '@angular/core';
import { AuditingService } from '../../../../global/api/service';
import { CustomModalBase } from '../../../ui/modal';
import { ColDef } from '../../../ui/table';
import { MyAuditingDetailInfoModel } from '../../../../global/api/data-model/models/my-auditing-detail-info.model';
import { CmsErrorHandler } from '../../../../global/error-handling';
import { Observable } from 'rxjs';

@Component({
  selector: 'cms-my-auditing-detail-modal',
  templateUrl: './my-auditing-detail-modal.component.html',
  styleUrls: ['./my-auditing-detail-modal.component.scss']
})
export class MyAuditingDetailModalComponent extends CustomModalBase<MyAuditingDetailModalComponent, any> implements OnInit {
  title = '審核紀錄';
  actions;

  @Input() orderId: number;
  myAuditingDetails$: Observable<MyAuditingDetailInfoModel[]>;

  colDefs: ColDef<MyAuditingDetailInfoModel>[] = [
    {
      colId: 'status',
      field: 'status',
      title: '狀態',
      width: '100px',
    },
    {
      colId: 'auditingGroupName',
      field: 'auditingGroupName',
      title: '群組',
      width: '120px',
    },
    {
      colId: 'auditingDeptName',
      field: 'auditingDeptName',
      title: '部門',
      width: '120px',
    },
    {
      colId: 'auditingName',
      field: 'auditingName',
      title: '主管',
      width: '120px',
    },
    // {
    //   colId: 'auditingStage',
    //   field: 'auditingStage',
    //   title: '階段',
    //   width: '80px',
    // },

    {
      colId: 'auditingTime',
      field: 'auditingTime',
      title: '時間',
      format: 'DATETIME',
      width: '100px',
    },
    {
      colId: 'auditingComment',
      field: 'auditingComment',
      title: '意見',
    },
  ];

  constructor(
    private auditingService: AuditingService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.updateSize('1280px');
    this.myAuditingDetails$ = this.auditingService.getMyAuditingDetail(this.orderId).pipe(
      CmsErrorHandler.rxHandleError(),
    );
  }

}
