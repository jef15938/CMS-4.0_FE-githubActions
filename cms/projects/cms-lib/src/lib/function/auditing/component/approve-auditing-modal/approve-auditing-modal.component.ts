import { Component, OnInit } from '@angular/core';
import { AuditingSubmitRequest } from '../../../../global/api/neuxAPI/bean/AuditingSubmitRequest';
import { CustomModalBase } from '../../../ui/modal';

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

  approveRequest: AuditingSubmitRequest = new AuditingSubmitRequest();

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
