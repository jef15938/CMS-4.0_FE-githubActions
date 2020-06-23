import { Component, OnInit } from '@angular/core';
import { CustomCellRenderer, CmsTable } from './../../../../../ui/table';
import { MyAuditingInfo } from './../../../../../neuxAPI/bean/MyAuditingInfo';

enum ActionType {
  Detail, PreviewPc, PreviewPadH, PreviewPadV, PreviewMobile
}

export class MyAuditingActionCellCustomEvent {
  ActionType = ActionType;
  constructor(
    public action: ActionType,
    public data: MyAuditingInfo,
  ) { }
}

@Component({
  selector: 'cms-my-auditing-action-cell',
  templateUrl: './my-auditing-action-cell.component.html',
  styleUrls: ['./my-auditing-action-cell.component.scss']
})
export class MyAuditingActionCellComponent implements CustomCellRenderer, OnInit {

  ActionType = ActionType;

  config: { data: MyAuditingInfo, table: CmsTable };

  constructor() { }

  ngOnInit(): void {
  }

  compInit(config: { data: any, table: CmsTable }) {
    this.config = config;
  }

  onAction(action: ActionType) {
    this.config.table.triggerCustomEvent(new MyAuditingActionCellCustomEvent(action, this.config.data));
  }

}
