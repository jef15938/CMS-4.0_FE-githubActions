import { HtmlEditorActionBase } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { HtmlEditorContext } from '../../../../html-editor.interface';
import { HtmlEditorTableControllerInterface } from '../table-controller.interface';

export class MarkCol extends HtmlEditorActionBase {

  constructor(
    context: HtmlEditorContext,
    private controller: HtmlEditorTableControllerInterface,
  ) {
    super(context);
  }

  do(): Observable<any> {
    if (!this.controller.selectedCols.length) { return this.context.modalService.openMessage({ message: '沒有選擇的欄' }); }

    const HIGH_LIGHT = 'highlightTD';
    this.controller.selectedCols.forEach(col => {
      if (!col.classList.contains(HIGH_LIGHT)) {
        col.classList.add(HIGH_LIGHT);
      } else {
        col.classList.remove(HIGH_LIGHT);
      }
      col.classList.remove('selected');
    });

    this.controller.checkTableState();
    this.context.simpleWysiwygService.setSelectionOnNode(this.controller.el);
    return of(undefined);
  }
}
