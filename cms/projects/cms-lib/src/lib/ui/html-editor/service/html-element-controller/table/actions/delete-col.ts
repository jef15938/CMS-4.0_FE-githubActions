import { HtmlEditorAction } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { IHtmlEditorContext } from '../../../../html-editor.interface';
import { ITableController, ITableCell } from '../table-controller.interface';

export class DeleteCol extends HtmlEditorAction {

  constructor(
    context: IHtmlEditorContext,
    private _controller: ITableController,
  ) {
    super(context);
  }

  do(): Observable<any> {
    const selectedCols = this._controller.selectedCols;
    if (!selectedCols.length) { return this.context.modalService.openMessage({ message: '沒有選擇的欄' }) }

    const rangeStartEnd = this._controller.tableControllerService.getStartEndBySelectedCols(this._controller.selectedCols);

    const colsToDelete: ITableCell[] = [];
    const minusMap = new Map<ITableCell, number>();

    const rows = Array.from(this._controller.el.querySelectorAll('tr')) as HTMLTableRowElement[];
    rows.forEach(row => {
      const cols = Array.from(row.childNodes) as ITableCell[];
      cols.forEach(col => {
        const startEnd = this._controller.tableControllerService.getCellStartEnd(col);
        if (startEnd.colStart >= rangeStartEnd.colStart && startEnd.colEnd <= rangeStartEnd.colEnd) {
          colsToDelete.push(col);
        } else {
          if (col.colSpan > 1) {
            const startEnd = this._controller.tableControllerService.getCellStartEnd(col);
            if (rangeStartEnd.colStart > startEnd.colStart && rangeStartEnd.colStart < startEnd.colEnd && rangeStartEnd.colEnd >= startEnd.colEnd) {
              minusMap.set(col, startEnd.colEnd - rangeStartEnd.colStart);
            }
            if (rangeStartEnd.colStart <= startEnd.colStart && rangeStartEnd.colEnd > startEnd.colStart && rangeStartEnd.colEnd < startEnd.colEnd) {
              minusMap.set(col, rangeStartEnd.colEnd - startEnd.colStart);
            }
          }
        }
      })
    });

    colsToDelete.forEach(col => {
      col.parentNode.removeChild(col);
    });

    minusMap.forEach((count, col) => {
      col.colSpan -= count;
    });

    this._controller.checkTableState();
    return of(undefined);
  }

}