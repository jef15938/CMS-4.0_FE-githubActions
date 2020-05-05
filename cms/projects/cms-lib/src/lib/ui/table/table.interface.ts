import { Type } from '@angular/core';

export interface ColDef {
  colId: string;
  field: string;
  title: string;
  cellClass?: string;
  cellRenderer?: Type<any>;
  headClass?: string;
}

export interface CmsTable {
  triggerCustomEvent: (event: any) => void;
}

export interface CustomCellRenderer {
  compInit: (config: { table: CmsTable, data: any }) => any;
}