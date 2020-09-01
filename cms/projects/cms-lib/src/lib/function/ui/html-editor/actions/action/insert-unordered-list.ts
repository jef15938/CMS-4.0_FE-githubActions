import { HtmlEditorActionBase } from '../action.base';
import { of } from 'rxjs';

export class InsertUnorderedList extends HtmlEditorActionBase {
  do() {
    const selected = this.context.selectedTarget as HTMLElement;
    console.warn('selected = ', selected);
    // const rowRoot = this.context.simpleWysiwygService.findRowRoot(this.context.editorContainer, selected);
    // if (rowRoot) {
    //   let padding = this.padding;
    //   const paddingLeft = rowRoot.style.getPropertyValue('padding-left');
    //   if (paddingLeft) {
    //     padding += +paddingLeft.replace('px', '');
    //   }
    //   rowRoot.style.setProperty('padding-left', `${padding}px`);
    // }
    return of(undefined);
  }
}
