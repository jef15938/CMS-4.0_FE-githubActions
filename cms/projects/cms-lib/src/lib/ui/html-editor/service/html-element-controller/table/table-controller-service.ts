export class TableControllerService {
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
    const colEnd = colStart + (cell.colSpan - 1);
    return { rowStart, rowEnd, colStart, colEnd };
  }
}