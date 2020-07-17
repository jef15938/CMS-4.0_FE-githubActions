import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CmsFarmTableInfo, CmsFarmTableDataInfo } from './../../../../../global/model';
import { CmsFarmTableDataAction, CmsFarmTableColumnDisplayType } from './../../../../../global/enum';
import { ACTION_COLUMN, CHECKBOX_COLUMN, FarmTableInfoActionEvent } from './farm-table-info.type';

@Component({
  selector: 'cms-farm-table-info',
  templateUrl: './farm-table-info.component.html',
  styleUrls: ['./farm-table-info.component.scss']
})
export class FarmTableInfoComponent implements OnInit {

  CHECKBOX_COLUMN = CHECKBOX_COLUMN;
  ACTION_COLUMN = ACTION_COLUMN;
  CmsFarmTableDataAction = CmsFarmTableDataAction;
  CmsFarmTableColumnDisplayType = CmsFarmTableColumnDisplayType;

  @Input() tableInfo: CmsFarmTableInfo;

  @Output() actionClick = new EventEmitter<FarmTableInfoActionEvent>();
  @Output() pageChange = new EventEmitter<number>();

  totalChecked = false;

  constructor() { }

  ngOnInit(): void {
    this.onRowCheckChange();
  }

  onActionClick(action: CmsFarmTableDataAction, rowData?: CmsFarmTableDataInfo) {
    this.actionClick.emit(new FarmTableInfoActionEvent(action, rowData));
  }

  onPageChanged(event: { pageIndex: number }) {
    this.pageChange.emit(event.pageIndex + 1);
  }

  onTotalCheckChange() {
    this.tableInfo.datas.forEach(data => {
      data.is_checked = this.totalChecked;
    });
  }

  onRowCheckChange() {
    this.totalChecked = this.tableInfo.datas.map(_ => _.is_checked).every(checked => !!checked);
  }

}
