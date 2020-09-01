import { HtmlEditorActionBase } from '../action.base';
import { of } from 'rxjs';

export class Indent extends HtmlEditorActionBase {

  private readonly padding = 40;

  do() {
    const selected = this.context.selectedTarget as HTMLElement;
    const rowRoot = this.context.simpleWysiwygService.findRowRoot(this.context.editorContainer, selected);
    if (rowRoot) {
      let padding = this.padding;
      const paddingLeft = rowRoot.style.getPropertyValue('padding-left');
      if (paddingLeft) {
        padding += +paddingLeft.replace('px', '');
      }
      rowRoot.style.setProperty('padding-left', `${padding}px`);
    }
    return of(undefined);
  }
}
