import { HtmlEditorActionBase } from '../action.base';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

const HIGH_LIGHT_CLASS = 'highlight';

export class Unhighlight extends HtmlEditorActionBase {

  do(): Observable<any> {
    document.execCommand('foreColor', false, '#ffff00');

    const container = this.context.editorContainer.cloneNode(true) as HTMLDivElement;

    if (Array.from(container.querySelectorAll('font[color="#ffff00"] img')).length > 0) {
      return this.context.modalService.openMessage({ message: 'unhighlight不可包含圖片' })
        .pipe(tap(_ => document.execCommand('undo')));
    } else {
      const elements = Array.from(container.querySelectorAll('font[color="#ffff00"]'));
      elements.forEach((el: HTMLElement) => {

        const innerHighlights = Array.from(el.querySelectorAll(`.${HIGH_LIGHT_CLASS}`)) as HTMLElement[];
        innerHighlights.forEach(highlight => {
          const parent = highlight.parentElement;
          const innerTextNode = document.createTextNode(highlight.innerText);
          parent.insertBefore(innerTextNode, highlight);
          parent.removeChild(highlight);
        });

        const textNode = document.createTextNode(el.innerHTML);

        const parentNode = el.parentNode as HTMLElement;
        if (parentNode?.classList?.contains(HIGH_LIGHT_CLASS)) {
          const next = parentNode.nextSibling;
          if (next) {
            next.parentNode.insertBefore(textNode, next);
          } else {
            parentNode.parentNode.appendChild(textNode);
          }
        } else {
          const next = el.nextSibling;
          if (next) {
            next.parentNode.insertBefore(textNode, next);
          } else {
            el.parentNode.appendChild(textNode);
          }
        }
        el.parentNode.removeChild(el);
      });

      const highlights = Array.from(container.querySelectorAll(`.${HIGH_LIGHT_CLASS}`));
      highlights.forEach(el => {
        if (!el.childNodes?.length) {
          el.parentNode.removeChild(el);
        }
      });

      this.context.editorContainer.innerHTML = container.innerHTML;
      this.context.checkInnerHtml();
      return of(undefined);
    }
  }

}
