import { HtmlEditorAction } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { IHtmlEditorContext } from '../../../../html-editor.interface';
import { ITableController, ITableCell } from '../table-controller.interface';

export class AddCol extends HtmlEditorAction {

  private position: 'left' | 'right';

  constructor(
    context: IHtmlEditorContext,
    private controller: ITableController,
    position: 'left' | 'right',
  ) {
    super(context);
    this.position = position;
  }

  do(): Observable<any> {
    if (!this.controller.selectedCols.length) { return this.context.modalService.openMessage({ message: '請選擇加入的基準欄' }); }

    const rangeStartEnd = this.controller.tableControllerService.getStartEndBySelectedCols(this.controller.selectedCols);
    // console.warn('rangeStartEnd = ', rangeStartEnd);

    let index = rangeStartEnd.colStart;
    if (this.position === 'right') {
      index = rangeStartEnd.colEnd;
    }

    const trArr = Array.from(this.controller.el.querySelectorAll('tr')) as HTMLTableRowElement[];
    let cols = 0;
    const rows = trArr.length;

    const row0Tds = Array.from(trArr[0].childNodes) as ITableCell[];
    row0Tds.forEach(td => {
      cols += td.colSpan;
    });
    cols += 1;

    var checkArr = [];
    for (let tmp_x = 0; tmp_x < rows; tmp_x++) {
      const tmp_arr = [];
      for (let tmp_y = 0; tmp_y < cols; tmp_y++) {
        tmp_arr.push(false);
      }
      checkArr.push(tmp_arr);
    }

    for (let j = 0; j < trArr.length; j++) {
      const element = trArr[j];
      const tds = Array.from(element.childNodes) as ITableCell[];
      let tmpTD: ITableCell;
      for (let i = 0; i < tds.length; i++) {
        tmpTD = tds[i];
        const startEnd = this.controller.tableControllerService.getCellStartEnd(tmpTD);
        var start = startEnd.colStart;
        var stop = startEnd.colEnd - 1;
        if (index >= start && index <= stop) {
          if (tmpTD.colSpan > 1) {
            tmpTD.colSpan = tmpTD.colSpan + 1;
          } else {
            const newCell = this.controller.tableControllerService.createCell('new');
            const insertBefore = tmpTD.nextElementSibling;
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

    trArr.forEach((tr, i) => {
      const tds = Array.from(tr.childNodes) as ITableCell[];
      tds.forEach((td, j) => {
        const pos = td.cellPos;
        // console.warn(td, pos);
        var left = pos.left;
        var top = pos.top;
        var colSpan = td.colSpan - 1;
        var rowSpan = td.rowSpan - 1;
        for (var x = left; x <= (left + colSpan); x++) {
          for (var y = top; y <= (top + rowSpan); y++) {
            checkArr[y][x] = true;
          }
        }
      })
    })
    // console.log('checkArr = ', checkArr);
    checkArr.forEach((row, i) => {
      var num = 0;
      row.forEach((td, j) => {
        if (!td)
          num++;
      })
      if (num > 0) {
        var target_row = trArr[i];
        const tds = Array.from(target_row.childNodes) as ITableCell[];
        // console.log('target_row = ', target_row);
        for (var i = 0; i < tds.length; i++) {
          const tmpTD = tds[i];
          const startEnd = this.controller.tableControllerService.getCellStartEnd(tmpTD);
          var start = startEnd.colStart;
          var stop = startEnd.colEnd - 1;
          if (index <= start || (i == tds.length - 1 && index >= stop)) {

            if (tmpTD.colSpan > 1) {
              tmpTD.colSpan = tmpTD.colSpan + 1;
            } else {
              const newCell = this.controller.tableControllerService.createCell('new');
              newCell.style.setProperty('width','70px');
              if (index == start || index >= stop) {
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

    })

    this.controller.checkTableState();
    this.controller.tableControllerService.registerColResizer(this.context.editorContainer, this.controller.el);
    return of(undefined);
  }
}