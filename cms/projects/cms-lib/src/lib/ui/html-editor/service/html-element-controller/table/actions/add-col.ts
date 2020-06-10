import { HtmlEditorAction } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { IHtmlEditorContext } from '../../../../html-editor.interface';
import { ITableController } from '../table-controller.interface';
import { TableControllerService } from '../table-controller-service';

export class AddCol extends HtmlEditorAction {

  private _position: 'left' | 'right';

  constructor(
    context: IHtmlEditorContext,
    private _controller: ITableController,
    position: 'left' | 'right',
  ) {
    super(context);
    this._position = position;
  }

  do(): Observable<any> {
    // if (!this._controller.selectedCols.length) { return this.context.modalService.openMessage({ message: '請選擇加入的基準欄' }); }

    // const selectedColsStartEnd = this._controller.tableControllerService.getStartEndBySelectedCols(this._controller.selectedCols);

    // const trs = Array.from(this._controller.el.querySelectorAll('tr')) as HTMLTableRowElement[];

    // const map = new Map<HTMLTableRowElement, HTMLTableDataCellElement>();

    // for (let i = 0, l = trs.length; i < l; ++i) {
    //   const row = trs[i];
    //   const tds = Array.from(row.childNodes) as HTMLTableDataCellElement[];
    //   if (this._position === 'left') {
    //     let insertBeforeIndex = selectedColsStartEnd.colStart;
    //     let insertBefore = tds[insertBeforeIndex];
    //     const affected = this._controller.tableControllerService.getAffectedByRowSpanCellCount(insertBefore, { checkFromRowStart: true });
    //     const previousColSpanOffset = Array.from(insertBefore.parentNode.childNodes).slice(0, insertBeforeIndex).reduce((a, b: HTMLTableDataCellElement) => a + (b.colSpan - 1), 0);
    //     console.error('insertBeforeIndex = ', insertBeforeIndex, insertBefore);
    //     insertBeforeIndex = insertBeforeIndex - (affected.rowOffset + affected.colOffset) - previousColSpanOffset;
    //     insertBefore = tds[insertBeforeIndex];
    //     console.error('    insertBeforeIndex = ', insertBeforeIndex, insertBefore);
    //     map.set(row, insertBefore);
    //   } else {
    //     let insertBeforeIndex = selectedColsStartEnd.colEnd + 1;
    //     let insertBefore = tds[insertBeforeIndex];
    //     console.error('insertBeforeIndex = ', insertBeforeIndex, insertBefore);

    //     // while (!insertBefore) {
    //     //   insertBeforeIndex--;
    //     //   insertBefore = tds[insertBeforeIndex];
    //     // }
    //     // console.error('    insertBeforeIndex = ', insertBeforeIndex, insertBefore);
        
    //     const affected = this._controller.tableControllerService.getAffectedByRowSpanCellCount(insertBefore, { checkFromRowStart: true });
    //     const previousColSpanOffset = Array.from(insertBefore.parentNode.childNodes).slice(0, insertBeforeIndex).reduce((a, b: HTMLTableDataCellElement) => a + (b.colSpan - 1), 0);
    //     console.error(insertBefore, affected, previousColSpanOffset);
    //     insertBeforeIndex -= previousColSpanOffset;
    //     if (affected.rowOffset) {
    //       insertBeforeIndex -= affected.colOffset;
    //     }
    //     insertBefore = tds[insertBeforeIndex];
    //     console.error('        insertBeforeIndex = ', insertBeforeIndex, insertBefore);

    //     map.set(row, insertBefore);
    //   }
    // }

    // map.forEach((insertBefore, row) => {
    //   const newCell = this._controller.tableControllerService.createCell('new');
    //   if (insertBefore) {
    //     row.insertBefore(newCell, insertBefore);
    //   } else {
    //     if (this._position === 'left') {
    //       row.insertBefore(newCell, row.firstChild);
    //     } else {
    //       row.appendChild(newCell);
    //     }
    //   }
    // });

    // const table = this._controller.el;
    // const rowParent = this._controller.selectedRows.map(row => row.parentElement)[0];
    // const rowParentChildren = Array.from(rowParent.childNodes);
    // const rowIndexes = this._controller.selectedRows.map(row => rowParentChildren.indexOf(row));
    // const baseRowIndex = this._position === 'before' ? Math.min(...rowIndexes) : Math.max(...rowIndexes);
    // const baseRow = rowParentChildren[baseRowIndex];

    // const newRow = document.createElement('tr');
    // const cols = this._controller.getSetting().cols;
    // for (let col = 0; col < cols; ++col) {
    //   const td = document.createElement('td');
    //   // td.innerHTML = '<div>文字</div>';
    //   td.innerHTML = '文字';
    //   td.setAttribute('class', 'tg-0pky');
    //   td.setAttribute('colspan', '1');
    //   td.setAttribute('rowspan', '1');
    //   newRow.appendChild(td);
    // }

    // if (this._position === 'before') {
    //   rowParent.insertBefore(newRow, baseRow);
    // } else {
    //   const next = baseRow.nextSibling;
    //   if (next) {
    //     rowParent.insertBefore(newRow, next);
    //   } else {
    //     rowParent.appendChild(newRow);
    //   }
    // }

    this._controller.checkTableState();
    return of(undefined);
  }
}