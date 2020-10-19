import { Component, OnInit } from '@angular/core';
import { CustomCellRenderer, CmsTable } from '../../../../ui/table';
import { GalleryInfoModel } from '../../../../../global/api/data-model/models/gallery-info.model';

enum ActionType {
  EDIT, COPY_URL,
}

export class GalleryActionCellCustomEvent {
  ActionType = ActionType;
  constructor(
    public action: ActionType,
    public data: GalleryInfoModel,
  ) { }
}

@Component({
  selector: 'cms-gallery-action-cell',
  templateUrl: './gallery-action-cell.component.html',
  styleUrls: ['./gallery-action-cell.component.scss']
})
export class GalleryActionCellComponent implements CustomCellRenderer, OnInit {

  ActionType = ActionType;

  config: { data: GalleryInfoModel, table: CmsTable };

  constructor() { }

  ngOnInit(): void {
  }

  compInit(config: { data: GalleryInfoModel, table: CmsTable }) {
    this.config = config;
  }

  onAction(action: ActionType) {
    this.config.table.triggerCustomEvent(new GalleryActionCellCustomEvent(action, this.config.data));
  }

}
