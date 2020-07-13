import { HtmlEditorActionBase } from '../action.base';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HtmlEditorContext } from '../../html-editor.interface';

const HIGH_LIGHT_CLASS = 'highlight';

export class Highlight extends HtmlEditorActionBase {

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

    const result = document.execCommand('foreColor', false, '#0000ff');

    const container = this.context.editorContainer.cloneNode(true) as HTMLDivElement;

    if (Array.from(container.querySelectorAll('font[color="#0000ff"] img')).length > 0) {
      return this.context.modalService.openMessage({ message: '標記文字不可包含圖片' })
        .pipe(tap(_ => document.execCommand('undo')));
    } else if (
      Array.from(container.querySelectorAll('font[color="#0000ff"] b,font[color="#0000ff"] i,font[color="#0000ff"] u,font[color="#0000ff"] strong,font[color="#0000ff"] em')).length > 0
      || Array.from(container.querySelectorAll('font[color="#0000ff"]'))
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
      const elements = Array.from(container.querySelectorAll('font[color="#0000ff"]')) as HTMLElement[];
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
      const children = Array.from(hightlightElement.childNodes) as HTMLElement[];
      const hasHighlightChild = children.some(child => child.classList?.contains(HIGH_LIGHT_CLASS));
      if (hasHighlightChild) {
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
      let next = hightlightElement.nextElementSibling;
      const nextSameClassElements = [];
      while (next && next.className === hightlightElement.className) {
        nextSameClassElements.push(next);
        next = next.nextElementSibling;
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
