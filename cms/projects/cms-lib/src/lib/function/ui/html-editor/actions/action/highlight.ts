import { HtmlEditorActionBase } from '../action.base';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HtmlEditorContext } from '../../html-editor.interface';
import { HtmlEditorActionCategory } from '../action.enum';

const HIGH_LIGHT_CLASS = 'highlight';

const HIGH_LIGHT_IDENTIFY_COLOR = '#FFC0CB';

export class Highlight extends HtmlEditorActionBase {
  category = HtmlEditorActionCategory.HIGHLIGHT;
  order: number;
  highlightClass: string;

  constructor(
    context: HtmlEditorContext,
    highlightOrder: number,
  ) {
    super(context);
    this.order = highlightOrder;
    this.highlightClass = `${HIGH_LIGHT_CLASS}-${this.order}`;
  }

  do(): Observable<any> {

    const result = document.execCommand('foreColor', false, HIGH_LIGHT_IDENTIFY_COLOR);

    const container = this.context.editorContainer.cloneNode(true) as HTMLDivElement;

    if (Array.from(container.querySelectorAll(`font[color="${HIGH_LIGHT_IDENTIFY_COLOR}"] img`)).length > 0) {
      return this.context.modalService.openMessage({ message: '標記文字不可包含圖片' })
        .pipe(tap(_ => document.execCommand('undo')));
    } else if (
      Array.from(container.querySelectorAll(`font[color="${HIGH_LIGHT_IDENTIFY_COLOR}"] b,font[color="${HIGH_LIGHT_IDENTIFY_COLOR}"] i,font[color="${HIGH_LIGHT_IDENTIFY_COLOR}"] u,font[color="${HIGH_LIGHT_IDENTIFY_COLOR}"] strong,font[color="${HIGH_LIGHT_IDENTIFY_COLOR}"] em`)).length > 0
      || Array.from(container.querySelectorAll(`font[color="${HIGH_LIGHT_IDENTIFY_COLOR}"]`))
        .map(el => el.parentNode)
        .filter((el: HTMLElement) => {
          if (!el?.tagName) { return false; }
          const targets = 'b,i,u,strong,em'.split(',');
          return targets.indexOf(el.tagName.toLowerCase()) > -1;
        }).length > 0
    ) {
      return this.context.modalService.openMessage({ message: '標記文字不可包含粗體、斜體或底線' })
        .pipe(tap(_ => document.execCommand('undo')));
    } else {
      const elements = Array.from(container.querySelectorAll(`font[color="${HIGH_LIGHT_IDENTIFY_COLOR}"]`)) as HTMLElement[];
      elements.forEach((el: HTMLElement) => {
        const innerHighlights = Array.from(el.querySelectorAll(`.${HIGH_LIGHT_CLASS}`)) as HTMLElement[];
        innerHighlights.forEach(highlight => {
          const innerParent = highlight.parentElement;
          const innerTextNode = document.createTextNode(highlight.innerText);
          innerParent.insertBefore(innerTextNode, highlight);
          innerParent.removeChild(highlight);
        });

        let node;
        const parent = el.parentElement;
        if (
          parent.classList.contains(HIGH_LIGHT_CLASS)
          && parent.classList.contains(this.highlightClass)
          && parent.innerText === el.innerText
        ) {
          node = document.createTextNode(el.innerText);
        } else {
          node = document.createElement('span');
          node.classList.add(HIGH_LIGHT_CLASS);
          node.classList.add(this.highlightClass);
          node.innerHTML = el.innerHTML;
        }
        parent.insertBefore(node, el);
        parent.removeChild(el);
      });

      this.flatHightlightElements(container);

      this.context.editorContainer.innerHTML = container.innerHTML;
      this.context.checkInnerHtml();
      return of(undefined);
    }
  }

  private flatHightlightElements(container: HTMLDivElement) {
    let hightlightElements = Array.from(container.querySelectorAll(`.${HIGH_LIGHT_CLASS}`)) as HTMLElement[];
    hightlightElements.forEach((hightlightElement: HTMLElement) => {
      if (hightlightElement.parentElement.tagName.toLowerCase() === 'a') {
        hightlightElement.parentElement.innerText = hightlightElement.parentElement.innerText;
        return;
      }

      const children = Array.from(hightlightElement.childNodes) as HTMLElement[];
      const hasElementChild = children.some(child => child.nodeType !== Node.TEXT_NODE);
      if (hasElementChild) {
        const parent = hightlightElement.parentElement;
        children.forEach(child => {
          if (child.nodeType === Node.TEXT_NODE) {
            const newContainer = hightlightElement.cloneNode() as HTMLElement;
            newContainer.appendChild(child);
            parent.insertBefore(newContainer, hightlightElement);
          } else {
            parent.insertBefore(child.cloneNode(true), hightlightElement);
          }
        });
        parent.removeChild(hightlightElement);
      }
    });

    hightlightElements = Array.from(container.querySelectorAll(`.${HIGH_LIGHT_CLASS}`)) as HTMLElement[];
    hightlightElements.forEach((hightlightElement: HTMLElement) => {
      let next = hightlightElement.nextSibling as Element;
      const nextSameClassElements = [];
      while (next && next.className === hightlightElement.className) {
        nextSameClassElements.push(next);
        next = next.nextSibling as Element;
      }
      nextSameClassElements.forEach(nextSameClassElement => {
        hightlightElement.innerHTML += nextSameClassElement.innerHTML;
        nextSameClassElement.parentElement.removeChild(nextSameClassElement);
        const index = hightlightElements.indexOf(nextSameClassElement);
        if (index > -1) {
          hightlightElements.splice(index, 1);
        }
      });
    });
  }

}
