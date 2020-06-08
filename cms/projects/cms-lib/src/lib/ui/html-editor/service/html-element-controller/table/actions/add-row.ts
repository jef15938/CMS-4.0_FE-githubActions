import { HtmlEditorAction } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { IHtmlEditorContext } from '../../../../html-editor.interface';
import { ITableController } from '../table-controller.interface';

export class AddRow extends HtmlEditorAction {

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
    const table = this._controller.el;
    const range = this.context.simpleWysiwygService.getRange();
    const row = this.context.simpleWysiwygService.findTagFromTargetToContainer(
      table,
      range.commonAncestorContainer as HTMLElement,
      'tr'
    );
    if (row) {
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
        row.parentNode.insertBefore(newRow, row);
      } else {
        const next = row.nextSibling;
        if (next) {
          row.parentNode.insertBefore(newRow, next);
        } else {
          row.parentNode.appendChild(newRow);
        }
      }
      this.context.simpleWysiwygService.setSelectionOnNode(table);
    }
    return of(undefined);
  }
}