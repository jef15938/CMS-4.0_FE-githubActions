import { Component, OnInit } from '@angular/core';
import { CustomCellRenderer, CmsTable } from './../../../../../../ui/table/table.interface';
import { GalleryInfo } from './../../../../../../neuxAPI/bean/GalleryInfo';

enum ActionType {
  Edit, Delete
}

export class GalleryActionCellCustomEvent {
  ActionType = ActionType;
  constructor(
    public action: ActionType,
    public data: GalleryInfo,
  ) { }
}

@Component({
  selector: 'cms-gallery-action-cell',
  templateUrl: './gallery-action-cell.component.html',
  styleUrls: ['./gallery-action-cell.component.scss']
})
export class GalleryActionCellComponent implements CustomCellRenderer, OnInit {

  ActionType = ActionType;

  config: { data: GalleryInfo, table: CmsTable };

  constructor() { }

  ngOnInit(): void {
  }

  compInit(config: { data: GalleryInfo, table: CmsTable }) {
    this.config = config;
  }

  onAction(action: ActionType) {
    this.config.table.triggerCustomEvent(new GalleryActionCellCustomEvent(action, this.config.data));
  }

}
