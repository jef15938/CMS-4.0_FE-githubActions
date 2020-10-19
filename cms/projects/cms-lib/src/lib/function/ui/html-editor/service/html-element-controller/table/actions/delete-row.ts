import { HtmlEditorActionBase } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { HtmlEditorContext } from '../../../../html-editor.interface';
import { HtmlEditorTableControllerInterface } from '../table-controller.interface';
import { HtmlEditorActionCategory } from '../../../../actions/action.enum';

export class DeleteRow extends HtmlEditorActionBase {
  category = HtmlEditorActionCategory.TABLE;
  constructor(
    context: HtmlEditorContext,
    private controller: HtmlEditorTableControllerInterface,
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
