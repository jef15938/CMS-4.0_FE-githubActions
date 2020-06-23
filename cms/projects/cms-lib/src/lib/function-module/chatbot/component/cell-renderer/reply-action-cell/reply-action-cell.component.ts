import { Component, OnInit } from '@angular/core';
import { CustomCellRenderer, CmsTable } from './../../../../../ui/table';
import { ChatbotReply } from '../../../chatbot.model';

enum ActionType {
  Edit, Delete
}

export class ReplyActionCellCustomEvent {
  ActionType = ActionType;
  constructor(
    public action: ActionType,
    public data: ChatbotReply,
  ) { }
}

@Component({
  selector: 'cms-reply-action-cell',
  templateUrl: './reply-action-cell.component.html',
  styleUrls: ['./reply-action-cell.component.scss']
})
export class ReplyActionCellComponent implements CustomCellRenderer, OnInit {

  ActionType = ActionType;

  config: { data: ChatbotReply, table: CmsTable };

  constructor() { }

  ngOnInit(): void {
  }

  compInit(config: { data: any, table: CmsTable }) {
    this.config = config;
  }

  onAction(action: ActionType) {
    this.config.table.triggerCustomEvent(new ReplyActionCellCustomEvent(action, this.config.data));
  }

}
