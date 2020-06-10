import { IHtmlEditorAction } from './action.interface';
import { IHtmlEditorContext } from '../html-editor.interface';
import { Observable, of } from 'rxjs';

export abstract class HtmlEditorAction implements IHtmlEditorAction {

  private _context: IHtmlEditorContext;

  protected get context() { return this._context; };

  abstract do(): Observable<any>;

  constructor(
    context: IHtmlEditorContext,
  ) {
    this._context = context;
  }
}

export abstract class DomCmdAction extends HtmlEditorAction {
  abstract commandId: string;

  do(): Observable<any> {
    document.execCommand(this.commandId);
    return of(undefined);
  }
}