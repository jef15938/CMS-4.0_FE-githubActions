import { Component, OnInit } from '@angular/core';
import { AuditingInfo } from '../../../../global/api/neuxAPI/bean/AuditingInfo';
import { CustomCellRenderer, CmsTable } from '../../../ui/table';

enum ActionType {
  Approve, Refuse, PreviewPc, PreviewPadH, PreviewPadV, PreviewMobile
}

export class AuditingActionCellCustomEvent {
  ActionType = ActionType;
  constructor(
    public action: ActionType,
    public data: AuditingInfo,
  ) { }
}

@Component({
  selector: 'cms-auditing-action-cell',
  templateUrl: './auditing-action-cell.component.html',
  styleUrls: ['./auditing-action-cell.component.scss']
})
export class AuditingActionCellComponent implements CustomCellRenderer, OnInit {

  ActionType = ActionType;

  config: { data: AuditingInfo, table: CmsTable };

  constructor() { }

  ngOnInit(): void {
  }

  compInit(config: { data: any, table: CmsTable }) {
    this.config = config;
  }

  onAction(action: ActionType) {
    this.config.table.triggerCustomEvent(new AuditingActionCellCustomEvent(action, this.config.data));
  }

}
