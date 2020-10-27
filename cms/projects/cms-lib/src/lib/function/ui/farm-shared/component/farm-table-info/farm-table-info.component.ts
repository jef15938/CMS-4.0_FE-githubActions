import { Component, OnInit, Input, Output, EventEmitter, Injector, OnChanges, SimpleChanges, Inject, Optional } from '@angular/core';
import { ACTION_COLUMN, CHECKBOX_COLUMN, FarmTableInfoActionEvent } from './farm-table-info.type';
import { FarmPlugin } from '../../farm-shared.interface';
import { Sort } from '@angular/material/sort';
import { FarmTableDataInfoModel, FarmTableDataInfoAction, FarmTableDataInfoColumnDisplayType } from '../../../../../global/api/data-model/models/farm-table-data-info.model';
import { FarmTableInfoModel } from '../../../../../global/api/data-model/models/farm-table-info.model';
import { FARM_PLUGIN_TOKEN } from '../../farm-shared-injection-token';

@Component({
  selector: 'cms-farm-table-info',
  templateUrl: './farm-table-info.component.html',
  styleUrls: ['./farm-table-info.component.scss']
})
export class FarmTableInfoComponent implements OnInit, OnChanges {

  CHECKBOX_COLUMN = CHECKBOX_COLUMN;
  ACTION_COLUMN = ACTION_COLUMN;
  FarmTableDataInfoAction = FarmTableDataInfoAction;
  FarmTableDataInfoColumnDisplayType = FarmTableDataInfoColumnDisplayType;

  @Input() funcID: string;
  @Input() tableInfo: FarmTableInfoModel;

  @Output() actionClick = new EventEmitter<FarmTableInfoActionEvent>();
  @Output() pageChange = new EventEmitter<number>();

  totalChecked = false;

  farmPlugin: FarmPlugin;

  sortedData: FarmTableDataInfoModel[];

  error = false;

  constructor(
    public injector: Injector,
    @Inject(FARM_PLUGIN_TOKEN) @Optional() private farmPlugins: FarmPlugin[],
  ) { }


  ngOnInit(): void {
    this.farmPlugin = (this.farmPlugins || []).reverse().find(h => h.funcId === this.funcID);
    this.sortData();
    this.onRowCheckChange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.sortData();
  }

  onActionClick(action: FarmTableDataInfoAction, rowData?: FarmTableDataInfoModel) {
    this.actionClick.emit(new FarmTableInfoActionEvent(action, rowData));
  }

  onPageChanged(event: { pageIndex: number }) {
    this.pageChange.emit(event.pageIndex + 1);
  }

  onTotalCheckChange() {
    this.tableInfo.datas.forEach(data => {
      data.isChecked = this.totalChecked;
    });
  }

  onRowCheckChange() {
    this.totalChecked = this.tableInfo.datas.map(_ => _.isChecked).every(checked => !!checked);
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
        a.columns.find(col => col.displayText === sort.active).value,
        b.columns.find(col => col.displayText === sort.active).value,
        isAsc
      );
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
