import { TableControllerService } from './table-controller-service';

export interface CellPos {
  top: number;
  left: number;
}

export interface HtmlEditorTableCell extends HTMLTableDataCellElement {
  cellPos: CellPos;
}

export interface HtmlEditorTableControllerInterface {
  el: HTMLTableElement;
  tableIndex: number;
  tableControllerService: TableControllerService;
  selectedCols: HTMLTableDataCellElement[];
  selectedRows: HTMLTableRowElement[];
  checkTableState(): void;
}
