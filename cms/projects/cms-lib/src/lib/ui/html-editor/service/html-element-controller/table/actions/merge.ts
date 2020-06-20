import { HtmlEditorActionBase } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { HtmlEditorContext } from '../../../../html-editor.interface';
import { ITableController, ITableCell } from '../table-controller.interface';

export class Merge extends HtmlEditorActionBase {

  constructor(
    context: HtmlEditorContext,
    private controller: ITableController,
  ) {
    super(context);
  }

  do(): Observable<any> {
    let selectedCols = this.controller.selectedCols as ITableCell[];
    if (selectedCols.length < 2) { return this.context.modalService.openMessage({ message: '請選擇至少兩欄' }); }

    const hasConsecutiveCol = selectedCols.some(col => selectedCols.indexOf(col.previousElementSibling as ITableCell) > -1);

    const selectedRows = this.controller.selectedRows;
    const hasConsecutiveRow = selectedRows.some(row => selectedRows.indexOf(row.previousElementSibling as HTMLTableRowElement) > -1);

    if (!hasConsecutiveCol && !hasConsecutiveRow) { return this.context.modalService.openMessage({ message: '沒有可合併的欄位' }); }

    const table = this.controller.el;
    selectedCols.forEach(col => {
      if (!table.contains(col)) { return; }
      const previous = col.previousElementSibling as ITableCell;
      if (
        previous
        && selectedCols.indexOf(previous) > -1
        && table.contains(previous)
        && previous.rowSpan === col.rowSpan
      ) {
        previous.colSpan += col.colSpan;
        col.parentNode.removeChild(col);
      }
    });

    selectedCols = selectedCols.filter(col => table.contains(col));
    selectedCols.forEach((col) => {
      if (!table.contains(col)) { return; }
      const startEnd = this.controller.tableControllerService.getCellStartEnd(col);

      const previous = selectedCols.find((c: ITableCell) => {
        const previousStartEnd = this.controller.tableControllerService.getCellStartEnd(c);
        if (
          col === c
          || previousStartEnd.colStart !== startEnd.colStart
          || previousStartEnd.colEnd !== startEnd.colEnd
          || previousStartEnd.rowEnd !== startEnd.rowStart
        ) { return false; }
        return true;
      });

      if (previous) {
        previous.rowSpan += col.rowSpan;
        col.parentNode.removeChild(col);
      }

    });

    this.controller.checkTableState();
    return of(undefined);
  }

}
