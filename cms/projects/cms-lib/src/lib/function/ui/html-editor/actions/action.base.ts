import { HtmlEditorAction } from './action.interface';
import { HtmlEditorContext } from '../html-editor.interface';
import { Observable, of } from 'rxjs';
import { HtmlEditorActionCategory } from './action.enum';

export abstract class HtmlEditorActionBase implements HtmlEditorAction {

  protected context: HtmlEditorContext;
  abstract category: HtmlEditorActionCategory;
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
