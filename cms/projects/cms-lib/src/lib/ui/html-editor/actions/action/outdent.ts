import { HtmlEditorAction } from '../action.base';
import { of } from 'rxjs';

export class Outdent extends HtmlEditorAction {

  private readonly padding = 40;

  do() {
    const selected = this.context.commonAncestorContainer as HTMLElement;
    const rowRoot = this.context.simpleWysiwygService.findRowRoot(this.context.editorContainer, selected);
    if (rowRoot) {
      let padding = 0;
      const paddingLeft = rowRoot.style.getPropertyValue('padding-left');
      if (paddingLeft) {
        padding = +paddingLeft.replace('px', '') - this.padding;
        if (padding < 0) { padding = 0; }
      }
      padding ? rowRoot.style.setProperty('padding-left', `${padding}px`) : rowRoot.style.removeProperty('padding-left');
    }
    return of(undefined);
  }
}