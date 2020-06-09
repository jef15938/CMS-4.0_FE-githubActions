import { HtmlEditorAction } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { IHtmlEditorContext } from '../../../../html-editor.interface';
import { ITableController } from '../table-controller.interface';

export class AddCol extends HtmlEditorAction {

  private _position: 'before' | 'after';

  constructor(
    context: IHtmlEditorContext,
    private _controller: ITableController,
    position: 'before' | 'after',
  ) {
    super(context);
    this._position = position;
  }

  do(): Observable<any> {
    if (!this._controller.selectedCols.length) { return this.context.modalService.openMessage({ message: '請選擇加入的基準欄' }); }

    const table = this._controller.el;
    const rowParent = this._controller.selectedRows.map(row => row.parentElement)[0];
    const rowParentChildren = Array.from(rowParent.childNodes);
    const rowIndexes = this._controller.selectedRows.map(row => rowParentChildren.indexOf(row));
    const baseRowIndex = this._position === 'before' ? Math.min(...rowIndexes) : Math.max(...rowIndexes);
    const baseRow = rowParentChildren[baseRowIndex];

    const newRow = document.createElement('tr');
    const cols = this._controller.getSetting().cols;
    for (let col = 0; col < cols; ++col) {
      const td = document.createElement('td');
      // td.innerHTML = '<div>文字</div>';
      td.innerHTML = '文字';
      td.setAttribute('class', 'tg-0pky');
      td.setAttribute('colspan', '1');
      td.setAttribute('rowspan', '1');
      newRow.appendChild(td);
    }

    if (this._position === 'before') {
      rowParent.insertBefore(newRow, baseRow);
    } else {
      const next = baseRow.nextSibling;
      if (next) {
        rowParent.insertBefore(newRow, next);
      } else {
        rowParent.appendChild(newRow);
      }
    }

    this._controller.checkTableState();
    return of(undefined);
  }
}