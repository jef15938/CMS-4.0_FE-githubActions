import { HtmlEditorActionBase } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { HtmlEditorContext } from '../../../../html-editor.interface';
import { HtmlEditorTableControllerInterface } from '../table-controller.interface';
import { HtmlEditorActionCategory } from '../../../../actions/action.enum';

export class AddRow extends HtmlEditorActionBase {
  category = HtmlEditorActionCategory.TABLE;
  private position: 'before' | 'after';

  constructor(
    context: HtmlEditorContext,
    private controller: HtmlEditorTableControllerInterface,
    position: 'before' | 'after',
  ) {
    super(context);
    this.position = position;
  }

  do(): Observable<any> {
    if (!this.controller.selectedRows.length) { return this.context.modalService.openMessage({ message: '請選擇加入的基準列' }); }

    const table = this.controller.el;
    const rows = table.querySelectorAll('tbody > tr');
    if (rows.length >= 15) { return this.context.modalService.openMessage({ message: '不能超過15列' }); }

    const rowParent = this.controller.selectedRows.map(row => row.parentElement)[0];
    const rowParentChildren = Array.from(rowParent.childNodes);
    const rowIndexes = this.controller.selectedRows.map(row => rowParentChildren.indexOf(row));
    const baseRowIndex = this.position === 'before' ? Math.min(...rowIndexes) : Math.max(...rowIndexes);
    const baseRow = rowParentChildren[baseRowIndex];

    const newRow = document.createElement('tr');
    const colCounts = this.getTableColCounts(table);
    for (let col = 0; col < colCounts; ++col) {
      const td = this.controller.tableControllerService.createCell();
      newRow.appendChild(td);
    }

    if (this.position === 'before') {
      rowParent.insertBefore(newRow, baseRow);
    } else {
      const next = baseRow.nextSibling;
      if (next) {
        rowParent.insertBefore(newRow, next);
      } else {
        rowParent.appendChild(newRow);
      }
    }

    this.controller.checkTableState();
    return of(undefined);
  }

  getTableColCounts(table: HTMLTableElement): number {
    return table?.querySelectorAll('thead > tr > td')?.length || 0;
  }
}
