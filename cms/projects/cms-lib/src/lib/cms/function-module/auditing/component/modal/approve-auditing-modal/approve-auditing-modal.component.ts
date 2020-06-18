import { Component, OnInit } from '@angular/core';
import { CustomModalBase } from './../../../../../../ui/modal/custom-modal-base';
import { AuditingSubmitRequest } from './../../../../../../neuxAPI/bean/AuditingSubmitRequest';

export enum AuditingApproveStatus {
  Approve = 'APPROVED',
  Reject = 'REJECT',
}

@Component({
  selector: 'cms-approve-auditing-modal',
  templateUrl: './approve-auditing-modal.component.html',
  styleUrls: ['./approve-auditing-modal.component.scss']
})
export class ApproveAuditingModalComponent extends CustomModalBase implements OnInit {

  AuditingApproveStatus = AuditingApproveStatus;

  title: string | (() => string) =
    () => [
      '審核',
      this.batch ? '批次' : '',
      this.status === AuditingApproveStatus.Approve ? '通過' : this.status === AuditingApproveStatus.Reject ? '退回' : ''
    ].join('');

  actions;

  batch = false;
  status: AuditingApproveStatus;

  approveRequest: AuditingSubmitRequest = new AuditingSubmitRequest();

  constructor() { super(); }

  ngOnInit(): void {
    if (!this.status || typeof (this.batch) !== 'boolean') { alert('參數錯誤'); setTimeout(_ => this.close(), 0); return; }
    this.approveRequest.status = this.status;
    this.approveRequest.comment = this.status === AuditingApproveStatus.Approve ? '審核通過' : '';
  }

  confirm() {
    this.close(this.approveRequest);
  }

}
