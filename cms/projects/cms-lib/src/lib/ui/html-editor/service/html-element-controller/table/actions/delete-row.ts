import { HtmlEditorActionBase } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { HtmlEditorContext } from '../../../../html-editor.interface';
import { ITableController } from '../table-controller.interface';

export class DeleteRow extends HtmlEditorActionBase {

  constructor(
    context: HtmlEditorContext,
    private controller: ITableController,
  ) {
    super(context);
  }

  do(): Observable<any> {
    if (!this.controller.selectedRows.length) { return this.context.modalService.openMessage({ message: '沒有選擇的列' }); }

    this.controller.selectedRows.forEach(row => {
      row.parentNode.removeChild(row);
    });

    this.controller.checkTableState();
    return of(undefined);
  }
}
