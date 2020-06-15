import { IHtmlEditorAction } from './action.interface';
import { IHtmlEditorContext } from '../html-editor.interface';
import { Observable, of } from 'rxjs';

export abstract class HtmlEditorAction implements IHtmlEditorAction {

  protected context: IHtmlEditorContext;

  abstract do(): Observable<any>;

  constructor(
    context: IHtmlEditorContext,
  ) {
    this.context = context;
  }
}

export abstract class DomCmdAction extends HtmlEditorAction {
  abstract commandId: string;

  do(): Observable<any> {
    document.execCommand(this.commandId);
    return of(undefined);
  }
}