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
    const table = this._controller.el;
    const range = this.context.simpleWysiwygService.getRange();
    const row = this.context.simpleWysiwygService.findTagFromTargetToContainer(
      table,
      range.commonAncestorContainer as HTMLElement,
      'tr'
    );
    if (row) {
      row.parentNode.removeChild(row);
      this.context.simpleWysiwygService.setSelectionOnNode(table);
    }
    return of(undefined);
  }
}