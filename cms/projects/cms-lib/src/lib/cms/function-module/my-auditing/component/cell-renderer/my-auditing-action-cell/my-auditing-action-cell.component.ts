import { Component, OnInit } from '@angular/core';
import { CustomCellRenderer, CmsTable } from 'projects/cms-lib/src/lib/ui/table/table.interface';
import { MyAuditingInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/MyAuditingInfo';

enum EventType {
  Detail, PreviewPc, PreviewPadH, PreviewPadV, PreviewMobile
}

export class MyAuditingActionCellCustomEvent {
  EventType = EventType;
  constructor(
    public action: EventType,
    public data: MyAuditingInfo,
  ) {
    this.action = action;
    this.data = data;
  }
}

@Component({
  selector: 'cms-my-auditing-action-cell',
  templateUrl: './my-auditing-action-cell.component.html',
  styleUrls: ['./my-auditing-action-cell.component.scss']
})
export class MyAuditingActionCellComponent implements CustomCellRenderer, OnInit {

  EventType = EventType;

  config: { data: MyAuditingInfo, table: CmsTable }

  constructor() { }

  ngOnInit(): void {
  }

  compInit(config: { data: any, table: CmsTable }) {
    this.config = config;
  };

  onAction(action: EventType) {
    this.config.table.triggerCustomEvent(new MyAuditingActionCellCustomEvent(action, this.config.data));
  }

}
