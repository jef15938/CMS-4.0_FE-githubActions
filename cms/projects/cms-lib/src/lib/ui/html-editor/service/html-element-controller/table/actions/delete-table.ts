import { HtmlEditorAction } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { IHtmlEditorContext } from '../../../../html-editor.interface';
import { ITableController } from '../table-controller.interface';

export class DeleteTable extends HtmlEditorAction {

  constructor(
    context: IHtmlEditorContext,
    private controller: ITableController,
  ) {
    super(context);
  }

  do(): Observable<any> {
    this.controller.el.parentNode.removeChild(this.controller.el);
    this.context.simpleWysiwygService.setSelectionOnNode(this.context.editorContainer);
    return of(undefined);
  }
}