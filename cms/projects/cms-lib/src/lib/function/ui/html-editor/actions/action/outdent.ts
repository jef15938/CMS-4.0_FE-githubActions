import { HtmlEditorActionBase } from '../action.base';
import { of } from 'rxjs';
import { HtmlEditorActionCategory } from '../action.enum';

export class Outdent extends HtmlEditorActionBase {
  category = HtmlEditorActionCategory.INDENT;
  private readonly margin = 40;

  do() {
    const selected = this.context.selectedTarget as HTMLElement;
    const rowRoot = this.context.simpleWysiwygService.findRowRoot(this.context.editorContainer, selected);
    if (rowRoot) {
      let margin = 0;
      const marginLeft = rowRoot.style.getPropertyValue('margin-left');
      if (marginLeft) {
        margin = +marginLeft.replace('px', '') - this.margin;
        if (margin < 0) { margin = 0; }
      }
      margin ? rowRoot.style.setProperty('margin-left', `${margin}px`) : rowRoot.style.removeProperty('margin-left');
    }
    return of(undefined);
  }
}
