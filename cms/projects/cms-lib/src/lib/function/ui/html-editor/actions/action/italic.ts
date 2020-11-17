import { Observable } from 'rxjs';
import { DomCmdAction } from '../action.base';
import { HtmlEditorActionCategory } from '../action.enum';

export class Italic extends DomCmdAction {
  category = HtmlEditorActionCategory.FONT_STYLE;
  commandId = 'italic';

  do(): Observable<any> {
    const hasHighlight =
      this.context.simpleWysiwygService.hasHighlight(this.context.editorContainer);

    return hasHighlight
      ? this.showHighlightError()
      : super.do();
  }

  private showHighlightError() {
    return this.context.modalService.openMessage({ message: '標記的文字不可設定斜體' });
  }
}
