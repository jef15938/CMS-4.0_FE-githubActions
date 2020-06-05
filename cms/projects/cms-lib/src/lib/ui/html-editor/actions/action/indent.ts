import { HtmlEditorAction } from '../action.base';
import { of } from 'rxjs';

export class Indent extends HtmlEditorAction {

  private readonly _padding = 40;

  do() {
    const selected = this.context.commonAncestorContainer as HTMLElement;
    const rowRoot = this.context.simpleWysiwygService.findRowRoot(this.context.editorContainer, selected);
    if (rowRoot) {
      let padding = this._padding;
      const paddingLeft = rowRoot.style.getPropertyValue('padding-left');
      if (paddingLeft) {
        padding += +paddingLeft.replace('px', '');
      }
      rowRoot.style.setProperty('padding-left', `${padding}px`);
    }
    return of(undefined);
  }
}