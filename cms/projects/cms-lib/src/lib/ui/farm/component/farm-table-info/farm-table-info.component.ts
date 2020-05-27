import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CmsFarmTableInfo, CmsFarmTableDataInfo } from 'projects/cms-lib/src/lib/type/farm.class';
import { ACTION_COLUMN, FarmTableInfoActionEvent } from './farm-table-info.type';
import { CmsFarmTableDataAction, CmsFarmTableColumnDisplayType } from 'projects/cms-lib/src/lib/type/farm.enum';

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

  constructor() { }

  ngOnInit(): void {
  }

  onActionClick(action: CmsFarmTableDataAction, rowData?: CmsFarmTableDataInfo) {
    this.actionClick.emit(new FarmTableInfoActionEvent(action, rowData));
  }

}
