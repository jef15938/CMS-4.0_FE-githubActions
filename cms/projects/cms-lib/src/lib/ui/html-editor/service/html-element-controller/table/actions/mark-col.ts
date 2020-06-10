import { HtmlEditorAction } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { IHtmlEditorContext } from '../../../../html-editor.interface';
import { ITableController } from '../table-controller.interface';

export class MarkCol extends HtmlEditorAction {

  constructor(
    context: IHtmlEditorContext,
    private _controller: ITableController,
  ) {
    super(context);
  }

  do(): Observable<any> {
    if (!this._controller.selectedCols.length) { return this.context.modalService.openMessage({ message: '沒有選擇的欄' }); }

    const HIGH_LIGHT = 'highlightTD';
    this._controller.selectedCols.forEach(col => {
      if (!col.classList.contains(HIGH_LIGHT)) {
        col.classList.add(HIGH_LIGHT);
      } else {
        col.classList.remove(HIGH_LIGHT);
      }
      col.classList.remove('selected');
    });

    this._controller.checkTableState();
    this.context.simpleWysiwygService.setSelectionOnNode(this._controller.el);
    return of(undefined);
  }
}