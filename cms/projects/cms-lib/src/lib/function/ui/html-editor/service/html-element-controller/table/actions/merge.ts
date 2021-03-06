import { HtmlEditorActionBase } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { HtmlEditorContext } from '../../../../html-editor.interface';
import { HtmlEditorTableControllerInterface, HtmlEditorTableCell } from '../table-controller.interface';
import { HtmlEditorActionCategory } from '../../../../actions/action.enum';

export class Merge extends HtmlEditorActionBase {
  category = HtmlEditorActionCategory.TABLE;
  constructor(
    context: HtmlEditorContext,
    private controller: HtmlEditorTableControllerInterface,
  ) {
    super(context);
  }

  do(): Observable<any> {
    let selectedCols = this.controller.selectedCols as HtmlEditorTableCell[];
    if (selectedCols.length < 2) { return this.context.modalService.openMessage({ message: '請選擇至少兩欄' }); }

    const hasConsecutiveCol = selectedCols.some(col => selectedCols.indexOf(col.previousElementSibling as HtmlEditorTableCell) > -1);

    const selectedRows = this.controller.selectedRows;
    const hasConsecutiveRow = selectedRows.some(row => selectedRows.indexOf(row.previousElementSibling as HTMLTableRowElement) > -1);

    if (!hasConsecutiveCol && !hasConsecutiveRow) { return this.context.modalService.openMessage({ message: '沒有可合併的欄位' }); }

    const table = this.controller.el;
    selectedCols.forEach(col => {
      if (!this.context.simpleWysiwygService.isChildOf(col, table)) { return; }
      const previous = col.previousElementSibling as HtmlEditorTableCell;
      if (
        previous
        && selectedCols.indexOf(previous) > -1
        && this.context.simpleWysiwygService.isChildOf(previous, table)
        && previous.rowSpan === col.rowSpan
      ) {
        previous.colSpan += col.colSpan;
        col.parentNode.removeChild(col);
      }
    });

    selectedCols = selectedCols.filter(col => this.context.simpleWysiwygService.isChildOf(col, table));
    selectedCols.forEach((col) => {
      if (!this.context.simpleWysiwygService.isChildOf(col, table)) { return; }
      const startEnd = this.controller.tableControllerService.getCellStartEnd(col);

      const previous = selectedCols.find((c: HtmlEditorTableCell) => {
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
