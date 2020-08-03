import { Component, Input, ViewChildren, QueryList, Output, EventEmitter, ComponentRef } from '@angular/core';
import { ColDef, CmsTableCustomCellEvent, CustomCellRenderer } from './table.interface';
import { DynamicWrapperDirective } from '@neux/core';

@Component({
  selector: 'cms-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<TData> {

  @ViewChildren(DynamicWrapperDirective) customRenderWrappers: QueryList<DynamicWrapperDirective<CustomCellRenderer>>;

  @Input() selectRow = false;
  @Input() colDefs: ColDef[];
  @Input() dataSource: TData[];

  @Output() customEvent = new EventEmitter<CmsTableCustomCellEvent>();
  @Output() rowClick = new EventEmitter<TData>();

  constructor() { }

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

}
