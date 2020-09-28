import { DomCmdAction } from '../action.base';
import { of } from 'rxjs';

export class InsertUnorderedList extends DomCmdAction {

  commandId = 'insertUnorderedList';

  do() {
    const selected = this.context.selectedTarget as HTMLElement;
    // console.warn('selected = ', selected);

    if (selected === this.context.editorContainer) {
      return super.do();
    }

    const closestUl = this.findClosestUl(selected, this.context.editorContainer);
    // console.warn('closestUl = ', closestUl);

    const newUl = document.createElement('ul');
    const li = document.createElement('li');
    newUl.appendChild(li);

    const level = (closestUl ? (+closestUl.getAttribute('level')) : 0) + 1;
    newUl.setAttribute('level', `${level}`);
    const textNode = document.createTextNode(`階層 (${level})`);
    li.appendChild(textNode);

    let parent = selected.parentElement;
    let insertBefore = selected;
    if (parent.tagName.toLowerCase() === 'li' || parent.tagName.toLowerCase() === 'p') {
      insertBefore = parent;
      parent = parent.parentElement;
    }

    insertBefore = insertBefore.nextElementSibling as HTMLElement;

    // console.warn({ parent, insertBefore });

    if (insertBefore) {
      parent.insertBefore(newUl, insertBefore);
    } else {
      parent.appendChild(newUl);
    }

    this.context.simpleWysiwygService.setSelectionOnNode(textNode, 1, 1);

    return of(undefined);
  }

  private findClosestUl(selected: HTMLElement, editorContainer: HTMLDivElement) {
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
}
