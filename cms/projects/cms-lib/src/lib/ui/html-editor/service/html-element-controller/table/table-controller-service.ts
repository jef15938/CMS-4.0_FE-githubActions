import { ITableCell } from './table-controller.interface';

export interface ITableSetting {
  cols: number;
  style: TableStyle;
}

export const TABLE_STYLE_ATTR = 'ga-table-style';
export enum TableStyle {
  PERCENT = 'percent',
  SCROLL = 'scroll',
  SINGLE = 'single',
};

export class TableControllerService {

  createCell(innerHTML?: string) {
    const td = document.createElement('td');
    // td.innerHTML = '<div>文字</div>';
    td.innerHTML = (innerHTML === null || innerHTML === undefined) ? '文字' : innerHTML;
    td.setAttribute('class', 'tg-0pky');
    td.setAttribute('colspan', '1');
    td.setAttribute('rowspan', '1');
    return td;
  }

  createTable(config: { src: string, alt: string, rows: number, cols: number }) {
    const table = document.createElement('table');

    table.classList.add('neux-table');
    table.setAttribute(TABLE_STYLE_ATTR, TableStyle.PERCENT);
    table.setAttribute('style', 'width: 99% !important;');

    const tHead = document.createElement('thead');
    table.appendChild(tHead);

    const trInTHead = document.createElement('tr');
    for (let col = 0; col < config.cols; ++col) {
      const td = this.createCell('');
      td.style.setProperty('height', '0');
      td.style.setProperty('padding', '0');
      td.style.setProperty('margin', '0');
      td.style.setProperty('font-size', '0');
      td.style.setProperty('line-height', '0');
      // td.style.setProperty('border', 'none');
      td.style.setProperty('overflow', 'hidden');

      trInTHead.appendChild(td);
    }
    tHead.appendChild(trInTHead);

    for (let row = 0; row < config.rows; ++row) {
      const tr = document.createElement('tr');
      for (let col = 0; col < config.cols; ++col) {
        const td = this.createCell();
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    return table;
  }

  getTableSetting(table: HTMLTableElement): ITableSetting {
    const cols = table.querySelectorAll('thead > tr > td').length;

    const styleAttr = table.getAttribute(TABLE_STYLE_ATTR);
    let style = TableStyle.PERCENT;
    switch (styleAttr) {
      case TableStyle.SCROLL:
        style = TableStyle.SCROLL;
        break;
      case TableStyle.SINGLE:
        style = TableStyle.SINGLE;
        break;
    }

    const tableSetting = { cols, style };
    return tableSetting;
  }

  getWidthFromStyle(col: HTMLElement) {
    return +(col.style.getPropertyValue('width').replace('px', ''));
  }

  checkTableColsWidth(table: HTMLTableElement) {
    this.checkTHeadTdsWidth(table);
    this.checkTBodyTdsWidth(table);
  }

  checkTHeadTdsWidth(table: HTMLTableElement) {
    const baseTds = Array.from(table.querySelectorAll('thead > tr > td')) as ITableCell[];
    if (!this.getWidthFromStyle(baseTds[0])) {
      baseTds.forEach(baseTd => {
        baseTd.style.setProperty('width', `${table.clientWidth / baseTds.length}px`);
      });
    }
    const styleAttr = table.getAttribute(TABLE_STYLE_ATTR);

    if (styleAttr !== TableStyle.SCROLL) {
      table.setAttribute('style', 'width:99% !important;');
    } else {
      const currentWidth = this.getWidthFromStyle(table);
      const style = table.getAttribute('style');
      if (!style || style === 'width:99% !important;') {
        table.setAttribute('style', `min-width: ${table.clientWidth}px; width: ${table.clientWidth}px;`);
      }
    }
  }

  checkTBodyTdsWidth(table: HTMLTableElement) {
    const tds = Array.from(table.querySelectorAll('tbody > tr > td')) as ITableCell[];
    tds.forEach(td => {
      const startEnd = this.getCellStartEnd(td);
      td.setAttribute('style', `width: ${this.getColWidthByColStartEnd(table, startEnd.colStart, startEnd.colEnd)}px;`)
    });
  }

  private getColWidthByColStartEnd(table: HTMLTableElement, colStart: number, colEnd: number) {
    const baseTds = (Array.from(table.querySelectorAll('thead > tr > td')) as ITableCell[])
      .filter(baseTd => {
        const baseStartEnd = this.getCellStartEnd(baseTd);
        return baseStartEnd.colStart === colStart || baseStartEnd.colEnd === colEnd;
      });
    const width = baseTds.map(baseTd => this.getWidthFromStyle(baseTd))
      .reduce((a, b) => a + b, 0);
    return width;
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

  getCellStartEnd(cell: ITableCell) {
    const pos = cell.cellPos;
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