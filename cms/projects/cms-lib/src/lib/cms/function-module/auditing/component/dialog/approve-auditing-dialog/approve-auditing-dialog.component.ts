import { Component, OnInit } from '@angular/core';
import { CustomDialogBase } from 'projects/cms-lib/src/lib/ui/dialog/custom-dialog-base';
import { AuditingSubmitRequest } from 'projects/cms-lib/src/lib/neuxAPI/bean/AuditingSubmitRequest';

export enum AuditingApproveStatus {
  Approve = 'approve',
  Refuse = 'refuse',
}

@Component({
  selector: 'cms-approve-auditing-dialog',
  templateUrl: './approve-auditing-dialog.component.html',
  styleUrls: ['./approve-auditing-dialog.component.css']
})
export class ApproveAuditingDialogComponent extends CustomDialogBase implements OnInit {

  AuditingApproveStatus = AuditingApproveStatus;

  title: string | (() => string) =
    () => [
      '審核',
      this.batch ? '批次' : '',
      this.status === AuditingApproveStatus.Approve ? '通過' : this.status === AuditingApproveStatus.Refuse ? '退回' : ''
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
