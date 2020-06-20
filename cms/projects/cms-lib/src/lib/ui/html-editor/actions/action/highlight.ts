import { HtmlEditorActionBase } from '../action.base';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export class Highlight extends HtmlEditorActionBase {

  do(): Observable<any> {
    document.execCommand('foreColor', false, '#0000ff');

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
      const elements = Array.from(container.querySelectorAll('font[color="#0000ff"]'));
      elements.forEach((el: HTMLElement) => {
        const span = document.createElement('span');
        span.classList.add('highlight');
        span.innerHTML = el.innerHTML;
        el.parentNode.insertBefore(span, el);
        el.parentNode.removeChild(el);
      });
      this.context.editorContainer.innerHTML = container.innerHTML;
      this.context.checkInnerHtml();
      return of(undefined);
    }
  }

}
