import { HtmlEditorAction } from '../action.base';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HtmlEditorInsertTableModalComponent } from '../../modal/html-editor-insert-table-modal/html-editor-insert-table-modal.component';

export class InsertTable extends HtmlEditorAction {

  do() {
    const range = this.context.simpleWysiwygService.getRange();
    if (!range) { return of(undefined); }

    const existingTable = this._findExistingTable();
    if (existingTable) {
      return this.context.modalService.openMessage({
        message: '表格內無法插入表格',
        title: '插入表格錯誤'
      });
    }

    return this.context.modalService.openComponent({
      component: HtmlEditorInsertTableModalComponent,
    }).pipe(
      tap((config: { src: string, alt: string, rows: number, cols: number }) => {
        this.context.simpleWysiwygService.restoreSelection(range);
        if (!config) { return; }

        const table = document.createElement('table');
        table.setAttribute('style', 'width: 99% !important;');
        table.classList.add('neux-table');

        for (let i = 0; i < config.rows; ++i) {
          const tr = document.createElement('tr');
          for (let j = 0; j < config.cols; ++j) {
            const td = document.createElement('td');
            td.innerHTML = '<div>文字</div>';
            td.setAttribute('class', 'tg-0pky');
            td.setAttribute('colspan', '1');
            td.setAttribute('rowspan', '1');
            tr.appendChild(td);
          }
          table.appendChild(tr);
        }

        const target = this.context.simpleWysiwygService.insertHtml(table.outerHTML);
        this.context.simpleWysiwygService.setSelectionOnNode(target);
      })
    );
  }

  private _findExistingTable(): HTMLTableElement {
    const range = this.context.simpleWysiwygService.getRange();
    const commonAncestorContainer = range.commonAncestorContainer as HTMLElement;
    const commonAncestorContainerTagName = commonAncestorContainer?.tagName?.toLowerCase();
    const tableTagNames = ['td', 'th', 'tr', 'table', 'tbody', 'thead', 'tfoot']
    if (commonAncestorContainer && tableTagNames.indexOf(commonAncestorContainerTagName) > -1) {
      let el = commonAncestorContainer;
      while (el) {
        const tagName = el.tagName?.toLowerCase();
        if (tagName === 'table') {
          break;
        } else {
          el = el.parentElement;
        }
      }
      return el as HTMLTableElement;
    }
    return null;
  }
}