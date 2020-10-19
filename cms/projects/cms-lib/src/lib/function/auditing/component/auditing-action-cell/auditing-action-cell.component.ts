import { Component, OnInit } from '@angular/core';
import { CustomCellRenderer, CmsTable } from '../../../ui/table';
import { AuditingInfoModel } from '../../../../global/api/data-model/models/auditing-info.model';

enum ActionType {
  APPROVE, REFUSE, PREVIEW
  // PreviewPc, PreviewPadH, PreviewPadV, PreviewMobile
}

export class AuditingActionCellCustomEvent {
  ActionType = ActionType;
  constructor(
    public action: ActionType,
    public data: AuditingInfoModel,
  ) { }
}

@Component({
  selector: 'cms-auditing-action-cell',
  templateUrl: './auditing-action-cell.component.html',
  styleUrls: ['./auditing-action-cell.component.scss']
})
export class AuditingActionCellComponent implements CustomCellRenderer, OnInit {

  ActionType = ActionType;

  config: { data: AuditingInfoModel, table: CmsTable };

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
