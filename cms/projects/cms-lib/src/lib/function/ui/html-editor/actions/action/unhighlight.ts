import { HtmlEditorActionBase } from '../action.base';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HtmlEditorActionCategory } from '../action.enum';

const HIGH_LIGHT_CLASS = 'highlight';

const HIGH_LIGHT_IDENTIFY_COLOR = '#ffff00';

export class Unhighlight extends HtmlEditorActionBase {
  category = HtmlEditorActionCategory.HIGHLIGHT;
  do(): Observable<any> {
    document.execCommand('foreColor', false, HIGH_LIGHT_IDENTIFY_COLOR);

    const container = this.context.editorContainer.cloneNode(true) as HTMLDivElement;

    if (Array.from(container.querySelectorAll(`font[color="${HIGH_LIGHT_IDENTIFY_COLOR}"] img`)).length > 0) {
      return this.context.modalService.openMessage({ message: 'unhighlight不可包含圖片' })
        .pipe(tap(_ => document.execCommand('undo')));
    } else {
      this.flatHightlightFontElements(container);

      const elements = Array.from(container.querySelectorAll(`font[color="${HIGH_LIGHT_IDENTIFY_COLOR}"]`)) as HTMLElement[];
      elements.forEach(el => {
        const textNode = document.createTextNode(el.innerText);
        el.parentElement.insertBefore(textNode, el);
        el.parentElement.removeChild(el);
      });

      this.context.editorContainer.innerHTML = container.innerHTML;
      this.context.checkInnerHtml();
      return of(undefined);
    }
  }

  private flatHightlightFontElements(container: HTMLDivElement) {
    let hightlightElements = Array.from(container.querySelectorAll(`font[color="${HIGH_LIGHT_IDENTIFY_COLOR}"]`)) as HTMLElement[];
    hightlightElements.forEach((hightlightElement: HTMLElement) => {
      const parent = hightlightElement.parentElement;

      if (parent.tagName?.toLowerCase() === 'a') {
        const innerText = parent.innerText;
        Array.from(parent.children)
          .forEach((child: Node) => child.parentElement.removeChild(child));
        parent.innerText = innerText;
        return;
      }

      const children = Array.from(hightlightElement.childNodes) as HTMLElement[];
      const hasElementChild = children.some(child => child.nodeType !== Node.TEXT_NODE);
      if (hasElementChild) {
        children.forEach(child => {
          if (
            child.nodeType === Node.TEXT_NODE
            ||
            (child.tagName?.toLowerCase() === 'span' && child.classList?.contains(HIGH_LIGHT_CLASS))
          ) {
            const newContainer = hightlightElement.cloneNode() as HTMLElement;
            newContainer.innerText = child.innerText || child.innerHTML || child.nodeValue || '';
            parent.insertBefore(newContainer, hightlightElement);
          } else {
            parent.insertBefore(child.cloneNode(true), hightlightElement);
          }
        });
        parent.removeChild(hightlightElement);
      }

    });

    hightlightElements = Array.from(container.querySelectorAll(`font[color="${HIGH_LIGHT_IDENTIFY_COLOR}"]`)) as HTMLElement[];

    hightlightElements.forEach((hightlightElement: HTMLElement) => {
      const parent = hightlightElement.parentElement;

      if (parent.classList?.contains(HIGH_LIGHT_CLASS)) {
        const children = Array.from(parent.childNodes) as HTMLElement[];

        children.forEach(child => {
          if (child.nodeType === Node.TEXT_NODE) {
            const newContainer = parent.cloneNode() as HTMLElement;
            newContainer.innerText = child.innerText || child.innerHTML || child.nodeValue || '';
            parent.parentElement.insertBefore(newContainer, parent);
          } else {
            parent.parentElement.insertBefore(child, parent);
          }
        });
        parent.parentElement.removeChild(parent);
      }

    });
  }

}
