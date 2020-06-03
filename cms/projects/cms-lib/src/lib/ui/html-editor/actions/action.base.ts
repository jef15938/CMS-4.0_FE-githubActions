import { IHtmlEditorAction } from './action.interface';
import { IHtmlEditorContext } from '../html-editor.interface';

export abstract class HtmlEditorAction implements IHtmlEditorAction {

  protected readonly context: IHtmlEditorContext;

  abstract do(): void;

  constructor(
    context: IHtmlEditorContext
  ) {
    this.context = context;
  }
}

export abstract class DomCmdAction extends HtmlEditorAction {
  abstract commandId: string;

  do(): void {
    document.execCommand(this.commandId);
  }
}