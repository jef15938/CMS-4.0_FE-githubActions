import { Type } from '@angular/core';

export interface ColDef {
  colId: string;
  field: string;
  title: string;
  cellClass?: string;
  cellRenderer?: Type<any>;
  headClass?: string;
}

export interface CustomCellRenderer {
  compInit: (config: { data }) => any;
}