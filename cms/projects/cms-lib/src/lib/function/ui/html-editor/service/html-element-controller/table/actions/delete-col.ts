import { HtmlEditorActionBase } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { HtmlEditorContext } from '../../../../html-editor.interface';
import { HtmlEditorTableControllerInterface, HtmlEditorTableCell } from '../table-controller.interface';
import { HtmlEditorActionCategory } from '../../../../actions/action.enum';

export class DeleteCol extends HtmlEditorActionBase {
  category = HtmlEditorActionCategory.TABLE;
  constructor(
    context: HtmlEditorContext,
    private controller: HtmlEditorTableControllerInterface,
  ) {
    super(context);
  }

  do(): Observable<any> {
    const selectedCols = this.controller.selectedCols;
    if (!selectedCols.length) { return this.context.modalService.openMessage({ message: '沒有選擇的欄' }); }

    const rangeStartEnd = this.controller.tableControllerService.getStartEndBySelectedCols(this.controller.selectedCols);

    const colsToDelete: HtmlEditorTableCell[] = [];
    const minusMap = new Map<HtmlEditorTableCell, number>();

    const rows = Array.from(this.controller.el.querySelectorAll('tr')) as HTMLTableRowElement[];
    rows.forEach(row => {
      const cols = Array.from(row.childNodes) as HtmlEditorTableCell[];
      cols.forEach(col => {
        const startEnd = this.controller.tableControllerService.getCellStartEnd(col);
        if (startEnd.colStart >= rangeStartEnd.colStart && startEnd.colEnd <= rangeStartEnd.colEnd) {
          colsToDelete.push(col);
        } else {
          if (col.colSpan > 1) {
            if (
              rangeStartEnd.colStart > startEnd.colStart
              && rangeStartEnd.colStart < startEnd.colEnd
              && rangeStartEnd.colEnd >= startEnd.colEnd
            ) {
              minusMap.set(col, startEnd.colEnd - rangeStartEnd.colStart);
            }
            if (
              rangeStartEnd.colStart <= startEnd.colStart
              && rangeStartEnd.colEnd > startEnd.colStart
              && rangeStartEnd.colEnd < startEnd.colEnd
            ) {
              minusMap.set(col, rangeStartEnd.colEnd - startEnd.colStart);
            }
          }
        }
      });
    });

    colsToDelete.forEach(col => {
      col.parentNode.removeChild(col);
    });

    minusMap.forEach((count, col) => {
      col.colSpan -= count;
    });

    this.controller.checkTableState();
    this.controller.tableControllerService.registerColResizer(this.controller.tableIndex, this.context.editorContainer, this.controller.el);
    return of(undefined);
  }

}
