import { Observable, of } from 'rxjs';
import { DomCmdAction } from '../action.base';
import { HtmlEditorActionCategory } from '../action.enum';

export class Bold extends DomCmdAction {
  category = HtmlEditorActionCategory.FONT_STYLE;
  commandId = 'bold';

  do(): Observable<any> {
    const hasHighlight =
      this.context.simpleWysiwygService.hasHighlight(this.context.editorContainer);

    return hasHighlight
      ? this.showHighlightError()
      : super.do();
  }

  private showHighlightError() {
    return this.context.modalService.openMessage({ message: '標記的文字不可設定粗體' });
  }
}
