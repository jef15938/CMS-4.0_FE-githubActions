import { Component, Input, ViewChildren, QueryList, Output, EventEmitter, ComponentRef, OnChanges, SimpleChanges } from '@angular/core';
import { ColDef, CmsTableCustomCellEvent, CustomCellRenderer } from './table.interface';
import { DynamicWrapperDirective } from '@neux/core';
import { Sort } from '@angular/material/sort';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'cms-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<TData> implements OnChanges {

  @ViewChildren(DynamicWrapperDirective) customRenderWrappers: QueryList<DynamicWrapperDirective<CustomCellRenderer>>;

  @Input() selectRow = false;
  @Input() colDefs: ColDef<TData>[];
  @Input() dataSource: TData[];
  @Input() checkbox = false;
  @Input() checkedData: TData[] = [];
  @Input() textError = '查詢錯誤';
  @Input() textNoData = '查無資料';

  @Output() customEvent = new EventEmitter<CmsTableCustomCellEvent>();
  @Output() rowClick = new EventEmitter<TData>();
  @Output() selectionChange = new EventEmitter<TData[]>();

  sortedData: TData[] = [];

  error = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataSource) {
      this.sortData();
    }
  }

  getDisplayedColumns() {
    return this.colDefs ? this.colDefs.map(c => c.colId) : [];
  }

  triggerCustomEvent(event: CmsTableCustomCellEvent) {
    this.customEvent.next(event);
  }

  onCellComponentLoad = (data) => {
    return (componentRef: ComponentRef<CustomCellRenderer>) => {
      const instance = componentRef.instance;
      if (instance?.compInit) {
        instance.compInit({
          table: this,
          data,
        });
      }
    };
  }

  onRowClick(row: TData) {
    if (!this.selectRow) { return; }
    this.rowClick.emit(row);
  }

  sortData(sort?: Sort) {
    const data = [...(this.dataSource || [])];
    if (!sort?.active || !sort?.direction) {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return this.compare(a[sort.active], b[sort.active], isAsc);
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onCheckboxAllChange(ev: MatCheckboxChange) {
    this.checkedData.length = 0;
    if (ev.checked) {
      this.sortedData.forEach(d => this.checkedData.push(d));
    }
  }

  onCheckboxSingleChange(ev: MatCheckboxChange, row: TData) {
    const index = this.checkedData.indexOf(row);
    if (ev.checked && index < 0) {
      this.checkedData.push(row);
    } else {
      this.checkedData.splice(index, 1);
    }
    this.selectionChange.emit(this.checkedData);
  }

}
