import { HtmlEditorAction } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { IHtmlEditorContext } from '../../../../html-editor.interface';
import { ITableController } from '../table-controller.interface';

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
    // if (selectedCols.some(col => col.rowSpan > 1 || col.colSpan > 1)) { return this.context.modalService.openMessage({ message: '選擇的欄包括不可刪除的合併欄位' }) }

    selectedCols.forEach(col => {
      const row = col.parentElement as HTMLTableRowElement;
      const trs = Array.from(row.parentNode.childNodes) as HTMLTableRowElement[];
      const rowIndex = trs.indexOf(row);
      const tds = Array.from(row.childNodes) as HTMLTableDataCellElement[];
      const colIndex = tds.indexOf(col);
      const adjustCol = (col.previousSibling || col.nextSibling) as HTMLTableDataCellElement;

      if (adjustCol) {
        this._adjustTd(adjustCol, col);
      }
      if (col.rowSpan > 1) {
        const rowStart = rowIndex + 1;
        const rowEnd = rowIndex + col.rowSpan;
        for (let i = rowStart; i < rowEnd; ++i) {
          const tr = trs[i];
          const childs = Array.from(tr.childNodes) as HTMLTableDataCellElement[];
          const td = childs[colIndex - 1] || childs[colIndex] || childs[colIndex + 1];
          if (td) {
            this._adjustTd(td, col);
          }
        }
      }
      row.removeChild(col);
    });

    this._controller.checkTableState();
    return of(undefined);
  }

  private _adjustTd(target: HTMLTableDataCellElement, from: HTMLTableDataCellElement) {
    target.colSpan += from.colSpan;
    const colwidth = +(from.style.getPropertyValue('width')?.replace('px', ''));
    const targetWidth = +(target.style.getPropertyValue('width')?.replace('px', ''));
    target.setAttribute('style', `width: ${targetWidth + colwidth}px`);
  }
}