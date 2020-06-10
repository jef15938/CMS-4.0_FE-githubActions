import { TableControllerService } from './table-controller-service';

export interface ICellPos {
  top: number;
  left: number;
}

export interface ITableCell extends HTMLTableDataCellElement {
  cellPos: ICellPos;
}

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