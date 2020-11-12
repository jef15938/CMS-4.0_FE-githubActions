import { HtmlEditorActionBase } from '../action.base';
import { of } from 'rxjs';
import { HtmlEditorActionCategory } from '../action.enum';
import { InsertUnorderedList } from './insert-unordered-list';

export class Indent extends HtmlEditorActionBase {
  category = HtmlEditorActionCategory.INDENT;
  private readonly margin = 40;

  do() {
    const container = this.context.editorContainer;
    const selected = this.context.selectedTarget as HTMLElement;
    const isListItem = !!this.context.simpleWysiwygService.findTagFromTargetToContainer(container, selected, 'ul');
    if (isListItem) { return this.doIndentListItem(container, selected); }
    return this.doIndent(container, selected);
  }

  private doIndentListItem(container: HTMLDivElement, selected: HTMLElement) {

    const closestUl = InsertUnorderedList.findClosestUl(selected, this.context.editorContainer);
    const level = InsertUnorderedList.getLevelOfUl(closestUl);
    const createUlResult = InsertUnorderedList.createLevedUL(level + 1);
    console.warn(closestUl);

    const parentLi = this.context.simpleWysiwygService.findTagFromTargetToContainer(container, selected, 'li');
    createUlResult.li.innerHTML = parentLi.innerHTML;

    const textNode = document.createTextNode('請輸入內容');
    parentLi.innerHTML = '';
    parentLi.appendChild(textNode);
    parentLi.appendChild(createUlResult.ul);

    this.context.simpleWysiwygService.setSelectionOnNode(createUlResult.li.firstChild, 1, 1);

    return of(undefined);
  }

  private doIndent(container: HTMLDivElement, selected: HTMLElement) {
    const rowRoot = this.context.simpleWysiwygService.findRowRoot(container, selected);
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
