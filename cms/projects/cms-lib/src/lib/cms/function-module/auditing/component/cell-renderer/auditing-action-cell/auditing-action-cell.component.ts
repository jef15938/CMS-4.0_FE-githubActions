import { Component, OnInit } from '@angular/core';
import { CustomCellRenderer, CmsTable } from 'projects/cms-lib/src/lib/ui/table/table.interface';
import { AuditingInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/AuditingInfo';

enum EventType {
  Approve, Refuse, PreviewPc, PreviewPadH, PreviewPadV, PreviewMobile
}

export class AuditingActionCellCustomEvent {
  EventType = EventType;
  constructor(
    public action: EventType,
    public data: AuditingInfo,
  ) {
    this.action = action;
    this.data = data;
  }
}

@Component({
  selector: 'cms-auditing-action-cell',
  templateUrl: './auditing-action-cell.component.html',
  styleUrls: ['./auditing-action-cell.component.scss']
})
export class AuditingActionCellComponent implements CustomCellRenderer, OnInit {

  EventType = EventType;

  config: { data: AuditingInfo, table: CmsTable }

  constructor() { }

  ngOnInit(): void {
  }

  compInit(config: { data: any, table: CmsTable }) {
    this.config = config;
  };

  onAction(action: EventType) {
    this.config.table.triggerCustomEvent(new AuditingActionCellCustomEvent(action, this.config.data));
  }

}
