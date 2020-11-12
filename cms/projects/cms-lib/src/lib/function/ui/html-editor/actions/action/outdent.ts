import { HtmlEditorActionBase } from '../action.base';
import { of } from 'rxjs';
import { HtmlEditorActionCategory } from '../action.enum';
import { InsertUnorderedList } from './insert-unordered-list';

export class Outdent extends HtmlEditorActionBase {
  category = HtmlEditorActionCategory.INDENT;
  private readonly margin = 40;

  do() {
    const container = this.context.editorContainer;
    const selected = this.context.selectedTarget as HTMLElement;
    const isListItem = !!this.context.simpleWysiwygService.findTagFromTargetToContainer(container, selected, 'ul');
    if (isListItem) { return this.doOutdentListItem(container, selected); }
    return this.doOutdent(container, selected);
  }

  private doOutdentListItem(container: HTMLDivElement, selected: HTMLElement) {

    const li = this.context.simpleWysiwygService.findTagFromTargetToContainer(container, selected, 'li');
    const ul = li.parentElement;

    const level = InsertUnorderedList.getLevelOfUl(ul);
    if (level === 1) { return this.context.modalService.openMessage({ message: '清單第一層不可向外縮排' }); }

    const parentOfUl = ul.parentElement;
    const targetParent = parentOfUl.parentElement;

    targetParent.insertBefore(li, parentOfUl);

    this.context.simpleWysiwygService.setSelectionOnNode(li.firstChild, 1, 1);
    return of(undefined);
  }

  private doOutdent(container: HTMLDivElement, selected: HTMLElement) {
    const rowRoot = this.context.simpleWysiwygService.findRowRoot(container, selected);
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
