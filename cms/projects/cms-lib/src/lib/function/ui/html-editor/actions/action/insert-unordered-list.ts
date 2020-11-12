import { DomCmdAction } from '../action.base';
import { of } from 'rxjs';
import { HtmlEditorActionCategory } from '../action.enum';
import { EDITOR_DEFAULT_CONTENT } from '../../const/html-editor-container.const';

export class InsertUnorderedList extends DomCmdAction {
  category = HtmlEditorActionCategory.LIST;
  commandId = 'insertUnorderedList';

  static createLevedUL(level: number) {
    const ul = document.createElement('ul');
    ul.setAttribute('level', `${level}`);

    const li = document.createElement('li');
    ul.appendChild(li);

    const textNode = document.createTextNode(`階層 (${level})`);
    li.appendChild(textNode);

    return { ul, li, textNode };
  }

  static findClosestUl(selected: HTMLElement, editorContainer: HTMLDivElement) {
    let closest = selected;
    while (closest) {
      if (selected === editorContainer || !editorContainer.contains(selected)) {
        return undefined;
      }
      if (closest.nodeType === Node.ELEMENT_NODE && (closest.tagName.toLowerCase() === 'ul')) {
        return closest;
      }
      closest = closest.parentElement;
    }
    return closest;
  }

  static getLevelOfUl(ul) {
    return ul ? +ul.getAttribute('level') : 0;
  }

  do() {
    const selected = this.context.selectedTarget as HTMLElement;
    // console.warn('selected = ', selected);

    if (selected.tagName?.toLowerCase() === 'li' && (selected.innerHTML === '' || selected.innerHTML === '<br>')) {
      return this.context.modalService.openMessage({
        title: '插入清單錯誤',
        message: '條列必須有文字才能再插入子清單',
      });
    }

    const closestUl = InsertUnorderedList.findClosestUl(selected, this.context.editorContainer);
    // console.warn('closestUl = ', closestUl);
    const level = InsertUnorderedList.getLevelOfUl(closestUl);
    // console.warn('level = ', level);
    const createUlResult = InsertUnorderedList.createLevedUL(level + 1);
    const newUl = createUlResult.ul;
    let parent = selected.parentElement;
    // console.warn('parent = ', parent);
    let insertBefore = selected;
    if (parent.tagName.toLowerCase() === 'p') {
      insertBefore = parent;
      parent = parent.parentElement;
    }
    if (selected.tagName?.toLowerCase() === 'li') {
      parent = selected;
    }
    insertBefore = insertBefore.nextElementSibling as HTMLElement;
    // console.warn({ parent, insertBefore });

    let targetToAdd: HTMLUListElement | HTMLLIElement = newUl;
    if (parent.tagName.toLowerCase() !== 'li' && parent.tagName.toLowerCase() !== 'div') {
      const newUlContainer = document.createElement('li');
      newUlContainer.appendChild(newUl);
      targetToAdd = newUlContainer;
    }

    if (selected === this.context.editorContainer && this.context.editorContainer.innerHTML === EDITOR_DEFAULT_CONTENT) {
      selected.innerHTML = '';
      selected.appendChild(targetToAdd);
    } else if (insertBefore) {
      parent.insertBefore(targetToAdd, insertBefore);
    } else {
      parent.appendChild(targetToAdd);
    }

    const textNode = createUlResult.textNode;
    this.context.simpleWysiwygService.setSelectionOnNode(textNode, 1, 1);

    return of(newUl);
  }

}
