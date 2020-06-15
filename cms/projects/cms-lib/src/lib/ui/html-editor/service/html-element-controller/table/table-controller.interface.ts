import { TableControllerService } from './table-controller-service';

export interface ICellPos {
  top: number;
  left: number;
}

export interface ITableCell extends HTMLTableDataCellElement {
  cellPos: ICellPos;
}

export interface ITableController {
  el: HTMLTableElement;
  tableControllerService: TableControllerService;
  selectedCols: HTMLTableDataCellElement[];
  selectedRows: HTMLTableRowElement[];
  checkTableState(): void;
}