import { ITableCell } from './table-controller.interface';

export class TableControllerService {

  createCell(innerHTML = '文字') {
    const td = document.createElement('td');
    // td.innerHTML = '<div>文字</div>';
    td.innerHTML = innerHTML;
    td.setAttribute('class', 'tg-0pky');
    td.setAttribute('colspan', '1');
    td.setAttribute('rowspan', '1');
    return td;
  }

  getAffectedByRowSpanCellCount(cell: HTMLTableDataCellElement): number {
    let affectedCount = 0;
    const cellParentIndex = (Array.from(cell.parentNode.parentNode.childNodes) as HTMLElement[]).indexOf(cell.parentNode as HTMLElement);
    const cellIndex = (Array.from(cell.parentNode.childNodes) as HTMLElement[]).indexOf(cell);
    const previousColSpanOffset = Array.from(cell.parentNode.childNodes).slice(0, cellIndex).reduce((a, b: HTMLTableDataCellElement) => a + (b.colSpan - 1), 0);
    const checkStart = cellIndex + previousColSpanOffset;
    let previousTr = cell.parentNode.previousSibling as HTMLTableRowElement;
    while (previousTr) {
      const trs = Array.from(previousTr.parentNode.childNodes) as HTMLTableRowElement[];
      const trIndex = trs.indexOf(previousTr);
      Array.from(previousTr.childNodes).forEach((td: HTMLTableDataCellElement, tdIndex) => {
        if (td.rowSpan <= 1) { return; }
        if ((td.rowSpan - 1) + trIndex < cellParentIndex) {
          return;
        }
        const tdPreviousColSpanOffset = Array.from(cell.parentNode.childNodes).slice(0, cellIndex).reduce((a, b: HTMLTableDataCellElement) => a + (b.colSpan - 1), 0);
        if (
          tdIndex + tdPreviousColSpanOffset <= checkStart
        ) {
          affectedCount += 1 + (td.colSpan - 1);
        }
      });
      previousTr = previousTr.previousSibling as HTMLTableRowElement;
    }
    return affectedCount;
  }

  // getAffectedByRowSpanCellCount(
  //   cell: HTMLTableDataCellElement,
  //   config?: {
  //     checkFromRowStart?: boolean,
  //   }
  // ): { colOffset: number, rowOffset: number } {

  //   const cellParentIndex = (Array.from(cell.parentNode.parentNode.childNodes) as HTMLElement[]).indexOf(cell.parentNode as HTMLElement);
  //   const cellIndex = (Array.from(cell.parentNode.childNodes) as HTMLElement[]).indexOf(cell);
  //   const previousColSpanOffset = Array.from(cell.parentNode.childNodes).slice(0, cellIndex).reduce((a, b: HTMLTableDataCellElement) => a + (b.colSpan - 1), 0);
  //   const checkStart = cellIndex + previousColSpanOffset;
  //   let previousTr = cell.parentNode.previousSibling as HTMLTableRowElement;

  //   let rowOffset = 0;
  //   let colOffset = 0;
  //   while (previousTr) {
  //     const trs = Array.from(previousTr.parentNode.childNodes) as HTMLTableRowElement[];
  //     const trIndex = trs.indexOf(previousTr);
  //     const tds = Array.from(previousTr.childNodes);
  //     tds.forEach((td: HTMLTableDataCellElement, tdIndex) => {
  //       // console.warn('td = ', td);
  //       if (td === cell) { return; }
  //       if (td.rowSpan <= 1) { return; }
  //       if ((td.rowSpan - 1) + trIndex < cellParentIndex) {
  //         return;
  //       }
  //       const tdPreviousColSpanOffset = Array.from(cell.parentNode.childNodes).slice(0, cellIndex).reduce((a, b: HTMLTableDataCellElement) => a + (b.colSpan - 1), 0);

  //       if (!config?.checkFromRowStart && tdIndex + tdPreviousColSpanOffset > checkStart) {
  //         return;
  //       }

  //       const rOffset = 1;
  //       rowOffset += rOffset;
  //       const cOffset = td.colSpan - 1;
  //       colOffset += cOffset;
  //     });
  //     previousTr = previousTr.previousSibling as HTMLTableRowElement;
  //   }
  //   const affectedCount = { colOffset, rowOffset };
  //   console.warn('  affectedCount = ', affectedCount);
  //   return affectedCount;
  // }

  // getCellStartEnd(cell: HTMLTableDataCellElement) {
  //   const row = cell.parentElement as HTMLTableRowElement;
  //   const trs = Array.from(row.parentNode.childNodes) as HTMLTableRowElement[];
  //   const rowIndex = trs.indexOf(row);
  //   const tds = Array.from(row.childNodes) as HTMLTableDataCellElement[];
  //   const cellIndex = tds.indexOf(cell);
  //   const colSpanOffser = Array.from(tds).slice(0, cellIndex).reduce((a, b: HTMLTableDataCellElement) => a + (b.colSpan - 1), 0);
  //   const affectedByRowSpanCount = this.getAffectedByRowSpanCellCount(cell);
  //   const rowStart = rowIndex;
  //   const rowEnd = rowStart + (cell.rowSpan - 1);
  //   const colStart = cellIndex + colSpanOffser + affectedByRowSpanCount;
  //   // const colStart = cellIndex + colSpanOffser + affectedByRowSpanCount.colOffset + affectedByRowSpanCount.colOffset;
  //   const colEnd = colStart + (cell.colSpan - 1);
  //   return { rowStart, rowEnd, colStart, colEnd };
  // }

  getCellStartEnd(cell: HTMLTableDataCellElement) {
    const pos = (cell as ITableCell).cellPos;
    const rowStart = pos.top;
    const rowEnd = rowStart + cell.rowSpan;
    const colStart = pos.left;
    const colEnd = colStart + cell.colSpan;

    const startEnd = { rowStart, rowEnd, colStart, colEnd };
    return startEnd;
  }

  getStartEndByStartCellAndEndCell(start: HTMLTableDataCellElement, end: HTMLTableDataCellElement) {
    const startPos = (start as ITableCell).cellPos;
    const endPos = (end as ITableCell).cellPos;

    const startRowStart = startPos.top;
    const startRowEnd = startRowStart + start.rowSpan;
    const startColStart = startPos.left;
    const startColEnd = startColStart + start.colSpan;

    const endRowStart = endPos.top;
    const endRowEnd = endRowStart + end.rowSpan;
    const endColStart = endPos.left;
    const endColEnd = endColStart + end.colSpan;

    const rowStart = Math.min(startRowStart, endRowStart);
    const rowEnd = Math.max(startRowEnd, endRowEnd);
    const colStart = Math.min(startColStart, endColStart);
    const colEnd = Math.max(startColEnd, endColEnd);

    const startEnd = { rowStart, rowEnd, colStart, colEnd };
    return startEnd;
  }

  getStartEndBySelectedCols(selectedCols: HTMLTableDataCellElement[]) {
    const start = selectedCols[0];
    const end = selectedCols[selectedCols.length - 1];
    return this.getStartEndByStartCellAndEndCell(start, end);
  }
  
}