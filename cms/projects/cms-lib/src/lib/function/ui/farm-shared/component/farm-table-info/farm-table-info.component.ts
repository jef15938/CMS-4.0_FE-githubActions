import { Component, OnInit, Input, Output, EventEmitter, Inject, Injector } from '@angular/core';
import { CmsFarmTableInfo, CmsFarmTableDataInfo } from './../../../../../global/model';
import { CmsFarmTableDataAction, CmsFarmTableColumnDisplayType } from './../../../../../global/enum';
import { ACTION_COLUMN, CHECKBOX_COLUMN, FarmTableInfoActionEvent } from './farm-table-info.type';
import { FARM_TABLE_ACTION_TOKEN } from '../../farm-shared-injection-token';
import { FarmTableAction } from '../../farm-shared.interface';
import { Sort } from '@angular/material/sort';

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

  @Input() funcID: string;
  @Input() tableInfo: CmsFarmTableInfo;

  @Output() actionClick = new EventEmitter<FarmTableInfoActionEvent>();
  @Output() pageChange = new EventEmitter<number>();

  totalChecked = false;
  customAction: FarmTableAction;

  sortedData: CmsFarmTableDataInfo[];

  error = false;

  constructor(
    public injector: Injector,
    @Inject(FARM_TABLE_ACTION_TOKEN) private farmTableActions: FarmTableAction[],
  ) { }

  ngOnInit(): void {
    this.customAction = this.farmTableActions.reverse().find(action => action.funcID === this.funcID);
    this.sortData();
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

  passDateStringFormat(value): boolean {
    if (!isNaN(+value)) { return true; }
    return false;
  }

  sortData(sort?: Sort) {
    const data = [...(this.tableInfo?.datas || [])];
    if (!sort?.active || !sort?.direction) {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return this.compare(
        a.columns.find(col => col.display_text === sort.active).value,
        b.columns.find(col => col.display_text === sort.active).value,
        isAsc
      );
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
