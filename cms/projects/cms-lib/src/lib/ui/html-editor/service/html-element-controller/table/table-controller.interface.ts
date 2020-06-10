import { TableControllerService } from './table-controller-service';

export interface ITableSetting {
  cols: number;
}

export interface ITableController {
  el: HTMLTableElement;
  tableControllerService: TableControllerService;
  selectedCols: HTMLTableDataCellElement[];
  selectedRows: HTMLTableRowElement[];
  getSetting(): ITableSetting;
  checkTableState(): void;
}