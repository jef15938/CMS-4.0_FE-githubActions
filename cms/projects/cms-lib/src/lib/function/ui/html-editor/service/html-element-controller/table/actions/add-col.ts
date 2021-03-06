import { HtmlEditorActionBase } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { HtmlEditorContext } from '../../../../html-editor.interface';
import { HtmlEditorTableControllerInterface, HtmlEditorTableCell } from '../table-controller.interface';
import { HtmlEditorActionCategory } from '../../../../actions/action.enum';

export class AddCol extends HtmlEditorActionBase {
  category = HtmlEditorActionCategory.TABLE;
  private position: 'left' | 'right';

  constructor(
    context: HtmlEditorContext,
    private controller: HtmlEditorTableControllerInterface,
    position: 'left' | 'right',
  ) {
    super(context);
    this.position = position;
  }

  do(): Observable<any> {
    if (!this.controller.selectedCols.length) { return this.context.modalService.openMessage({ message: '請選擇加入的基準欄' }); }

    const table = this.controller.el;
    const firstRowTds = Array.from(Array.from(table.querySelectorAll('tbody > tr'))[0].children) as HTMLTableDataCellElement[];
    const allCols = firstRowTds.reduce((a, b) => a += b.colSpan, 0);
    if (allCols >= 15) { return this.context.modalService.openMessage({ message: '不能超過15行' }); }

    const rangeStartEnd = this.controller.tableControllerService.getStartEndBySelectedCols(this.controller.selectedCols);
    // console.warn('rangeStartEnd = ', rangeStartEnd);

    let index = rangeStartEnd.colStart;
    if (this.position === 'right') {
      index = rangeStartEnd.colEnd;
    }

    const trArr = Array.from(this.controller.el.querySelectorAll('tr')) as HTMLTableRowElement[];
    let cols = 0;
    const rows = trArr.length;

    const row0Tds = Array.from(trArr[0].childNodes) as HtmlEditorTableCell[];
    row0Tds.forEach(td => {
      cols += td.colSpan;
    });
    cols += 1;

    const checkArr = [];
    for (let tmpX = 0; tmpX < rows; tmpX++) {
      const tmpArr = [];
      for (let tmpY = 0; tmpY < cols; tmpY++) {
        tmpArr.push(false);
      }
      checkArr.push(tmpArr);
    }

    // tslint:disable-next-line: prefer-for-of
    for (let j = 0; j < trArr.length; j++) {
      const element = trArr[j];
      const tds = Array.from(element.childNodes) as HtmlEditorTableCell[];
      let tmpTD: HtmlEditorTableCell;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < tds.length; i++) {
        tmpTD = tds[i];
        const startEnd = this.controller.tableControllerService.getCellStartEnd(tmpTD);
        const start = startEnd.colStart;
        const stop = startEnd.colEnd - 1;
        if (index >= start && index <= stop) {
          if (tmpTD.colSpan > 1 && start !== index) {
            tmpTD.colSpan = tmpTD.colSpan + 1;
          } else {
            const newCell = this.controller.tableControllerService.createCell('new');
            const insertBefore = this.position === 'right' ? tmpTD : tmpTD.nextElementSibling;
            if (insertBefore) {
              tmpTD.parentNode.insertBefore(newCell, tmpTD);
            } else {
              tmpTD.parentNode.appendChild(newCell);
            }
            break;
          }
        }

      }
    }

    // console.log('checkArr = ', checkArr);

    this.controller.checkTableState();
    this.controller.tableControllerService.checkTableColsWidth(table);

    trArr.forEach((tr) => {
      const tds = Array.from(tr.childNodes) as HtmlEditorTableCell[];
      tds.forEach((td) => {
        const pos = td.cellPos;
        // console.warn(td, pos);
        const left = pos.left;
        const top = pos.top;
        const colSpan = td.colSpan - 1;
        const rowSpan = td.rowSpan - 1;
        for (let x = left; x <= (left + colSpan); x++) {
          for (let y = top; y <= (top + rowSpan); y++) {
            checkArr[y][x] = true;
          }
        }
      });
    });
    // console.log('checkArr = ', checkArr);
    checkArr.forEach((row, i) => {
      let num = 0;
      row.forEach((td) => {
        if (!td) { num++; }
      });
      if (num > 0) {
        const targetRow = trArr[i];
        const tds = Array.from(targetRow.childNodes) as HtmlEditorTableCell[];
        // console.log('targetRow = ', targetRow);
        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < tds.length; j++) {
          const tmpTD = tds[j];
          const startEnd = this.controller.tableControllerService.getCellStartEnd(tmpTD);
          const start = startEnd.colStart;
          const stop = startEnd.colEnd - 1;
          if (index <= start || (j === tds.length - 1 && index >= stop)) {

            if (tmpTD.colSpan > 1) {
              tmpTD.colSpan = tmpTD.colSpan + 1;
            } else {
              const newCell = this.controller.tableControllerService.createCell('new');
              newCell.style.setProperty('width', '70px');
              if (index === start || index >= stop) {
                const insertBefore = tmpTD.nextElementSibling;
                if (insertBefore) {
                  tmpTD.parentNode.insertBefore(newCell, tmpTD);
                } else {
                  tmpTD.parentNode.appendChild(newCell);
                }
              } else {
                tmpTD.parentNode.insertBefore(newCell, tmpTD);
              }
            }
            break;
          }
        }
      }

    });

    this.controller.checkTableState();
    this.controller.tableControllerService.registerColResizer(this.controller.tableIndex, this.context.editorContainer, this.controller.el);
    return of(undefined);
  }
}
