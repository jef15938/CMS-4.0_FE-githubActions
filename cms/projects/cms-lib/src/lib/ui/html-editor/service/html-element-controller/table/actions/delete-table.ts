import { HtmlEditorActionBase } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { HtmlEditorContext } from '../../../../html-editor.interface';
import { HtmlEditorTableControllerInterface } from '../table-controller.interface';

export class DeleteTable extends HtmlEditorActionBase {

  constructor(
    context: HtmlEditorContext,
    private controller: HtmlEditorTableControllerInterface,
  ) {
    super(context);
  }

  do(): Observable<any> {
    this.controller.el.parentNode.removeChild(this.controller.el);
    this.context.simpleWysiwygService.setSelectionOnNode(this.context.editorContainer);
    return of(undefined);
  }
}
