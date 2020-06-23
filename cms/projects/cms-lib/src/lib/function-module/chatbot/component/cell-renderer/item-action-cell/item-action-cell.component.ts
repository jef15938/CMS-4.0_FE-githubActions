import { Component, OnInit } from '@angular/core';
import { CustomCellRenderer, CmsTable } from './../../../../../ui/table';
import { ChatbotItem } from '../../../chatbot.model';

enum ActionType {
  Edit, Delete
}

export class ItemActionCellCustomEvent {
  ActionType = ActionType;
  constructor(
    public action: ActionType,
    public data: ChatbotItem,
  ) { }
}

@Component({
  selector: 'cms-item-action-cell',
  templateUrl: './item-action-cell.component.html',
  styleUrls: ['./item-action-cell.component.scss']
})
export class ItemActionCellComponent implements CustomCellRenderer, OnInit {

  ActionType = ActionType;

  config: { data: ChatbotItem, table: CmsTable };

  constructor() { }

  ngOnInit(): void {
  }

  compInit(config: { data: any, table: CmsTable }) {
    this.config = config;
  }

  onAction(action: ActionType) {
    this.config.table.triggerCustomEvent(new ItemActionCellCustomEvent(action, this.config.data));
  }

}
