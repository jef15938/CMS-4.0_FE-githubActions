import { HtmlEditorActionBase } from '../action.base';
import { of } from 'rxjs';
import { HtmlEditorActionCategory } from '../action.enum';

export class Indent extends HtmlEditorActionBase {
  category = HtmlEditorActionCategory.INDENT;
  private readonly margin = 40;

  do() {
    const selected = this.context.selectedTarget as HTMLElement;
    const rowRoot = this.context.simpleWysiwygService.findRowRoot(this.context.editorContainer, selected);
    if (rowRoot) {
      let margin = this.margin;
      const marginLeft = rowRoot.style.getPropertyValue('margin-left');
      if (marginLeft) {
        margin += +marginLeft.replace('px', '');
      }
      rowRoot.style.setProperty('margin-left', `${margin}px`);
    }
    return of(undefined);
  }
}
