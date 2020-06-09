import { HtmlEditorAction } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { IHtmlEditorContext } from '../../../../html-editor.interface';
import { ITableController } from '../table-controller.interface';

export class DeleteRow extends HtmlEditorAction {

  constructor(
    context: IHtmlEditorContext,
    private _controller: ITableController,
  ) {
    super(context);
  }

  do(): Observable<any> {
    if (!this._controller.selectedRows.length) { return this.context.modalService.openMessage({ message: '沒有選擇的列' }) }

    this._controller.selectedRows.forEach(row => {
      row.parentNode.removeChild(row);
    });

    this._controller.checkTableState();
    return of(undefined);
  }
}