import { Component, OnInit } from '@angular/core';
import { CustomCellRenderer, CmsTable } from '../../../../ui/table';
import { FileUploadModel } from '../../../../../global/api/service';

enum ActionType {
  CROP, DELETE,
}

export class UploadGalleryActionCellCustomEvent {
  ActionType = ActionType;
  constructor(
    public action: ActionType,
    public data: FileUploadModel,
  ) { }
}

@Component({
  selector: 'cms-upload-gallery-action-cell',
  templateUrl: './upload-gallery-action-cell.component.html',
  styleUrls: ['./upload-gallery-action-cell.component.scss']
})
export class UploadGalleryActionCellComponent implements CustomCellRenderer, OnInit {

  ActionType = ActionType;

  config: { data: FileUploadModel, table: CmsTable };

  constructor() { }

  ngOnInit(): void {
  }

  compInit(config: { data: FileUploadModel, table: CmsTable }) {
    this.config = config;
  }

  onAction(action: ActionType) {
    this.config.table.triggerCustomEvent(new UploadGalleryActionCellCustomEvent(action, this.config.data));
  }

}
