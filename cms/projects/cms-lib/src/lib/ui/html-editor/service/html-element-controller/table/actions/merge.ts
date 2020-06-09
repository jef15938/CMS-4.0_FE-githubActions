import { HtmlEditorAction } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { IHtmlEditorContext } from '../../../../html-editor.interface';
import { ITableController } from '../table-controller.interface';

export class Merge extends HtmlEditorAction {

  constructor(
    context: IHtmlEditorContext,
    private _controller: ITableController,
  ) {
    super(context);
  }

  do(): Observable<any> {
    if (this._controller.selectedCols.length < 2) { return this.context.modalService.openMessage({ message: '請選擇要合併的複數欄' }); }

    const colCountInRows = this._controller.selectedRows
      .map(row => Array.from(row.childNodes).filter((col: HTMLTableDataCellElement) => this._controller.selectedCols.indexOf(col) > -1).reduce((a, b: HTMLTableDataCellElement) => a + b.colSpan, 0));
    if (!(colCountInRows.every(colCount => colCount === colCountInRows[0]))) {
      return this.context.modalService.openMessage({ message: '欲合併的欄位不正確' });
    }

    const colsInRows = this._controller.selectedRows
      .map(row => Array.from(row.childNodes).filter((col: HTMLTableDataCellElement) => this._controller.selectedCols.indexOf(col) > -1).map(col => col as HTMLTableDataCellElement));

    let firstCol: HTMLTableDataCellElement;
    colsInRows.forEach((row, rowIndex) => {
      let width = 0;
      row.forEach((col, colIndex) => {
        width += +(col.style.getPropertyValue('width').replace('px', ''));
        if (!rowIndex && !colIndex) {
          firstCol = col;
          return;
        }
        if (!rowIndex) {
          firstCol.colSpan += col.colSpan;
        }
      });
      if (!rowIndex) {
        firstCol.setAttribute('style', `width: ${width}px`);
      }
      if (rowIndex) {
        firstCol.rowSpan += 1;
      }
    });

    const colsToDelete = this._controller.selectedCols.filter(col => col !== firstCol);
    colsToDelete.forEach(col => col.parentNode.removeChild(col));

    this._controller.checkTableState();
    return of(undefined);
  }
}