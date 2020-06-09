export interface ITableSetting {
  cols: number;
}

export interface ITableController {
  el: HTMLTableElement;
  selectedCols: HTMLTableDataCellElement[];
  selectedRows: HTMLTableRowElement[];
  getSetting(): ITableSetting;
  checkTableState(): void;
}