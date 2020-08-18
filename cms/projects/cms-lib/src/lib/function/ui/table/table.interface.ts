import { Type } from '@angular/core';

export interface ColDef {
  colId: string;
  field: string;
  title: string;
  cellClass?: string;
  cellRenderer?: Type<any>;
  headClass?: string;
  format?: 'DATE' | 'DATETIME';
  width?: string;
}

export interface CmsTableCustomCellEvent {
  ActionType: any;
  action: any;
  data: any;
}

export interface CmsTable {
  triggerCustomEvent: (event: CmsTableCustomCellEvent) => void;
}

export interface CustomCellRenderer {
  compInit: (config: { table: CmsTable, data: any }) => any;
}
