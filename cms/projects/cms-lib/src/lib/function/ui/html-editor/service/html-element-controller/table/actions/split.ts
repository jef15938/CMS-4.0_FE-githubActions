import { HtmlEditorActionBase } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { HtmlEditorContext } from '../../../../html-editor.interface';
import { HtmlEditorTableControllerInterface } from '../table-controller.interface';

export class Split extends HtmlEditorActionBase {

  private orientation: 'horizontal' | 'verticle';

  constructor(
    context: HtmlEditorContext,
    private controller: HtmlEditorTableControllerInterface,
    orientation: 'horizontal' | 'verticle',
  ) {
    super(context);
    this.orientation = orientation;
  }

  do(): Observable<any> {
    if (!this.controller.selectedCols.length) { return this.context.modalService.openMessage({ message: '請選擇加入的基準列' }); }

    const cell = this.controller.selectedCols[0];
    const row = cell.parentNode as HTMLTableRowElement;

    if (this.orientation === 'horizontal') {
      const totalRowSpan = cell.rowSpan;
      const oldRowSpan = Math.round(totalRowSpan / 2);
      const newRowSpan = totalRowSpan - oldRowSpan;

      cell.rowSpan = oldRowSpan;

      const newCell = cell.cloneNode() as HTMLTableDataCellElement;
      newCell.rowSpan = newRowSpan;
      newCell.innerHTML = cell.innerHTML;

      const tds = Array.from(row.childNodes) as HTMLTableDataCellElement[];
      const cellIndex = tds.indexOf(cell);
      const trs = Array.from(row.parentNode.childNodes) as HTMLTableRowElement[];
      const rowIndex = trs.indexOf(row);
      const targetRowIndex = rowIndex + oldRowSpan;
      const targetRow = trs[targetRowIndex];
      const tdsInTargetRow = Array.from(targetRow.childNodes) as HTMLTableDataCellElement[];
      const insertBefore = tdsInTargetRow[cellIndex];
      if (insertBefore) {
        targetRow.insertBefore(newCell, insertBefore);
      } else {
        targetRow.appendChild(newCell);
      }
    } else {
      const totalColSpan = cell.colSpan;
      const totalWidth = +(cell.style.getPropertyValue('width').replace('px', ''));

      const oldColSpan = Math.round(totalColSpan / 2);
      const oldWidth = totalWidth / totalColSpan * oldColSpan;

      const newColSpan = totalColSpan - oldColSpan;
      const newWidth = totalWidth - oldWidth;

      cell.colSpan = oldColSpan;
      cell.style.setProperty('width', `${oldWidth}px`);

      const newCell = cell.cloneNode() as HTMLTableDataCellElement;
      newCell.colSpan = newColSpan;
      newCell.style.setProperty('width', `${newWidth}px`);
      newCell.innerHTML = cell.innerHTML;

      row.insertBefore(newCell, cell);
    }

    this.controller.checkTableState();
    return of(undefined);
  }
}
