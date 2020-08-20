import { Component, OnInit } from '@angular/core';
import { CustomModalBase } from '../../../ui/modal';
import { AuditingSubmitRequestModel } from '../../../../global/api/data-model/models/auditing-submit-request.model';

export enum AuditingApproveStatus {
  APPROVED = 'APPROVED',
  REJECT = 'REJECT',
}

@Component({
  selector: 'cms-approve-auditing-modal',
  templateUrl: './approve-auditing-modal.component.html',
  styleUrls: ['./approve-auditing-modal.component.scss']
})
export class ApproveAuditingModalComponent extends CustomModalBase implements OnInit {

  AuditingApproveStatus = AuditingApproveStatus;

  actions;

  batch = false;
  status: AuditingApproveStatus;

  approveRequest: AuditingSubmitRequestModel = new AuditingSubmitRequestModel();

  title: string | (() => string) =
    () => [
      '審核',
      this.batch ? '批次' : '',
      this.status === AuditingApproveStatus.APPROVED ? '通過' : this.status === AuditingApproveStatus.REJECT ? '退回' : ''
    ].join('')

  constructor() { super(); }

  ngOnInit(): void {
    this.approveRequest.status = this.status;
    this.approveRequest.comment = this.status === AuditingApproveStatus.APPROVED ? '審核通過' : '';
  }

  confirm() {
    this.close(this.approveRequest);
  }

}
