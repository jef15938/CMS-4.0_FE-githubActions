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

  getCellStartEnd(cell: HTMLTableDataCellElement) {
    const row = cell.parentElement as HTMLTableRowElement;
    const trs = Array.from(row.parentNode.childNodes) as HTMLTableRowElement[];
    const rowIndex = trs.indexOf(row);
    const tds = Array.from(row.childNodes) as HTMLTableDataCellElement[];
    const cellIndex = tds.indexOf(cell);
    const colSpanOffser = Array.from(tds).slice(0, cellIndex).reduce((a, b: HTMLTableDataCellElement) => a + (b.colSpan - 1), 0);
    const affectedByRowSpanCount = this.getAffectedByRowSpanCellCount(cell);
    const rowStart = rowIndex;
    const rowEnd = rowStart + (cell.rowSpan - 1);
    const colStart = cellIndex + colSpanOffser + affectedByRowSpanCount;
    // const colStart = cellIndex + colSpanOffser + affectedByRowSpanCount.colOffset + affectedByRowSpanCount.colOffset;
    const colEnd = colStart + (cell.colSpan - 1);
    return { rowStart, rowEnd, colStart, colEnd };
  }

  getStartEndByStartAndEnd(start: HTMLTableDataCellElement, end: HTMLTableDataCellElement) {
    const startCellStartEnd = this.getCellStartEnd(start);
    const endCellStartEnd = this.getCellStartEnd(end);

    const rowStart = startCellStartEnd.rowStart <= endCellStartEnd.rowStart ? startCellStartEnd.rowStart : endCellStartEnd.rowStart;
    const rowEnd = startCellStartEnd.rowEnd >= endCellStartEnd.rowEnd ? startCellStartEnd.rowEnd : endCellStartEnd.rowEnd;
    const colStart = startCellStartEnd.colStart <= endCellStartEnd.colStart ? startCellStartEnd.colStart : endCellStartEnd.colStart;
    const colEnd = startCellStartEnd.colEnd >= endCellStartEnd.colEnd ? startCellStartEnd.colEnd : endCellStartEnd.colEnd;

    const startEnd = { rowStart, rowEnd, colStart, colEnd };
    return startEnd;
  }

  getStartEndBySelectedCols(selectedCols: HTMLTableDataCellElement[]) {
    let colStart: number = null;
    let colEnd: number = null;
    let rowStart: number = null;
    let rowEnd: number = null;

    selectedCols.forEach(col => {
      const colStartEnd = this.getCellStartEnd(col);

      if (colStart === null) {
        colStart = colStartEnd.colStart;
      } else {
        colStart = colStart < colStartEnd.colStart ? colStart : colStartEnd.colStart;
      }

      if (colEnd === null) {
        colEnd = colStartEnd.colEnd;
      } else {
        colEnd = colEnd > colStartEnd.colEnd ? colEnd : colStartEnd.colEnd;
      }

      if (rowStart === null) {
        rowStart = colStartEnd.rowStart;
      } else {
        rowStart = rowStart < colStartEnd.rowStart ? rowStart : colStartEnd.rowStart;
      }

      if (rowEnd === null) {
        rowEnd = colStartEnd.rowEnd;
      } else {
        rowEnd = rowEnd > colStartEnd.rowEnd ? rowEnd : colStartEnd.rowEnd;
      }

    });

    const startEnd = { rowStart, rowEnd, colStart, colEnd };
    return startEnd;
  }
}