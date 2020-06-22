import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CmsFarmTableInfo, CmsFarmTableDataInfo, CmsFarmTableDataAction, CmsFarmTableColumnDisplayType } from '@cms-lib/type';
import { ACTION_COLUMN, FarmTableInfoActionEvent } from './farm-table-info.type';

@Component({
  selector: 'cms-farm-table-info',
  templateUrl: './farm-table-info.component.html',
  styleUrls: ['./farm-table-info.component.scss']
})
export class FarmTableInfoComponent implements OnInit {

  ACTION_COLUMN = ACTION_COLUMN;
  CmsFarmTableDataAction = CmsFarmTableDataAction;
  CmsFarmTableColumnDisplayType = CmsFarmTableColumnDisplayType;

  @Input() tableInfo: CmsFarmTableInfo;

  @Output() actionClick = new EventEmitter<FarmTableInfoActionEvent>();
  @Output() pageChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onActionClick(action: CmsFarmTableDataAction, rowData?: CmsFarmTableDataInfo) {
    this.actionClick.emit(new FarmTableInfoActionEvent(action, rowData));
  }

  onPageChanged(event: { pageIndex: number }) {
    this.pageChange.emit(event.pageIndex + 1);
  }

}
