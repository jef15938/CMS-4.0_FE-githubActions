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

    selectedCols.forEach(col => {
      const row = col.parentElement;
      const adjustCol = (col.previousSibling || col.nextSibling) as HTMLTableDataCellElement;
      if (adjustCol) {
        adjustCol.colSpan += col.colSpan;
        const colwidth = +(col.style.getPropertyValue('width')?.replace('px', ''));
        const adjustColWidth = +(adjustCol.style.getPropertyValue('width')?.replace('px', ''));
        adjustCol.setAttribute('style', `width: ${adjustColWidth + colwidth}px`)
      }
      row.removeChild(col);
    });

    this._controller.checkTableState();
    return of(undefined);
  }
}