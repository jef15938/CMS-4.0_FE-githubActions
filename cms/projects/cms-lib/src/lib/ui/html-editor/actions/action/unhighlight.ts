import { HtmlEditorActionBase } from '../action.base';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

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
        const textNode = document.createTextNode(el.innerHTML);

        const parentNode = el.parentNode as HTMLElement;
        if (parentNode?.classList?.contains('highlight')) {
          console.warn(1);
          const next = parentNode.nextSibling;
          if (next) {
            console.warn(2);
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

      const highlights = Array.from(container.querySelectorAll('.highlight'));
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
