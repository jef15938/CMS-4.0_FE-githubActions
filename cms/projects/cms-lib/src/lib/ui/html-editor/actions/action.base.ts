import { HtmlEditorAction } from './action.interface';
import { HtmlEditorContext } from '../html-editor.interface';
import { Observable, of } from 'rxjs';

export abstract class HtmlEditorActionBase implements HtmlEditorAction {

  protected context: HtmlEditorContext;

  abstract do(): Observable<any>;

  constructor(
    context: HtmlEditorContext,
  ) {
    this.context = context;
  }
}

export abstract class DomCmdAction extends HtmlEditorActionBase {
  abstract commandId: string;

  do(): Observable<any> {
    document.execCommand(this.commandId);
    return of(undefined);
  }
}
