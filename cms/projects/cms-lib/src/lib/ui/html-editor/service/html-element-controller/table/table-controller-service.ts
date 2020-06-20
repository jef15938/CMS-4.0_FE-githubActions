import { ITableCell } from './table-controller.interface';
import { Subscription, fromEvent } from 'rxjs';
import { switchMap, takeUntil, tap, throttleTime } from 'rxjs/operators';

export interface ITableSetting {
  cols: number;
  style: TableStyle;
}

export const TABLE_STYLE_ATTR = 'ga-table-style';
export enum TableStyle {
  PERCENT = 'percent',
  SCROLL = 'scroll',
  SINGLE = 'single',
}

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
      this.setTHeadTd(td);
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

  setTHeadTd(td: HTMLElement) {
    td.style.setProperty('height', '0');
    td.style.setProperty('padding', '0');
    td.style.setProperty('margin', '0');
    td.style.setProperty('font-size', '0');
    td.style.setProperty('line-height', '0');
    // td.style.setProperty('border', 'none');
    td.style.setProperty('overflow', 'hidden');
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

  checkTableColsWidth(table: HTMLTableElement, isAdjustingColWidth = false) {
    this.checkTHeadTdsWidth(table, isAdjustingColWidth);
    this.checkTBodyTdsWidth(table, isAdjustingColWidth);
  }

  checkTHeadTdsWidth(table: HTMLTableElement, isAdjustingColWidth = false) {
    const baseTds = Array.from(table.querySelectorAll('thead > tr > td')) as ITableCell[];
    if (baseTds.every(td => !this.getWidthFromStyle(td))) { // init
      baseTds.forEach(td => {
        td.style.setProperty('width', `${table.clientWidth / baseTds.length}px`);
      });
    } else {
      if (!isAdjustingColWidth) {
        baseTds.forEach(td => {
          td.style.setProperty('width', `${td.offsetWidth}px`);
        });
      }
    }

    const styleAttr = table.getAttribute(TABLE_STYLE_ATTR);

    if (styleAttr !== TableStyle.SCROLL) {
      table.setAttribute('style', 'width:99% !important;');
    } else {
      const currentWidth = this.getWidthFromStyle(table);
      const style = table.getAttribute('style');
      if (!style || style === 'width:99% !important;') {
        table.setAttribute('style', `min-width: ${table.offsetWidth}px; width: ${table.offsetWidth}px;`);
      }
    }
  }

  checkTBodyTdsWidth(table: HTMLTableElement, isAdjustingColWidth = false) {
    const tds = Array.from(table.querySelectorAll('tbody > tr > td')) as ITableCell[];
    tds.forEach(td => {
      if (isAdjustingColWidth) {
        const startEnd = this.getCellStartEnd(td);
        td.setAttribute('style', `width: ${this.getColWidthByColStartEnd(table, startEnd.colStart, startEnd.colEnd)}px;`);
      } else {
        td.setAttribute('style', `width: ${td.offsetWidth}px;`);
      }
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
    const previousColSpanOffset = Array.from(cell.parentNode.childNodes)
      .slice(0, cellIndex)
      .reduce((a, b: HTMLTableDataCellElement) => a + (b.colSpan - 1), 0);
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
        const tdPreviousColSpanOffset = Array.from(cell.parentNode.childNodes)
          .slice(0, cellIndex).
          reduce((a, b: HTMLTableDataCellElement) => a + (b.colSpan - 1), 0);
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

  evPreventDefaultAndStopPropagation = (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
  }

  registerColResizer(editorContainer: HTMLDivElement, table: HTMLTableElement) {
    if (!editorContainer || !table.parentNode) { return; }
    this.unregisterColResizer(editorContainer);

    const baseTds = Array.from(table.querySelectorAll('thead > tr > td')) as ITableCell[];
    // console.warn('baseTds = ', baseTds);
    const container = document.createElement('div');
    container.classList.add('col-resizer-container');
    container.style.setProperty('position', 'relative');
    container.style.setProperty('height', '0');

    baseTds.forEach((baseTd, i) => {
      const nextTd = baseTd.nextElementSibling as HTMLTableDataCellElement;
      if (i === baseTds.length - 1) { return; }
      // console.log('--------------------------------------');
      // console.warn('baseTd = ', baseTd);
      // console.warn('nextTd = ', nextTd);

      // console.warn('baseTd.clientHeight = ', baseTd.clientHeight);
      // console.warn('baseTd.clientLeft = ', baseTd.clientLeft);
      // console.warn('baseTd.clientTop = ', baseTd.clientTop);
      // console.warn('baseTd.clientWidth = ', baseTd.clientWidth);
      // console.warn('baseTd.offsetHeight = ', baseTd.offsetHeight);
      // console.warn('baseTd.offsetLeft = ', baseTd.offsetLeft);
      // console.warn('baseTd.offsetTop = ', baseTd.offsetTop);
      // console.warn('baseTd.offsetWidth = ', baseTd.offsetWidth);
      // console.warn('baseTd.width = ', baseTd.width);
      // console.warn('baseTd.height = ', baseTd.height);

      const div = document.createElement('div');
      div.classList.add('col-resizer');
      div.style.setProperty('cursor', 'ew-resize');
      div.style.setProperty('position', 'absolute');
      div.style.setProperty('top', '0');
      div.style.setProperty('left', `${baseTd.offsetLeft + baseTd.offsetWidth}px`);
      div.style.setProperty('width', '10px');
      div.style.setProperty('height', `${table.clientHeight}px`);
      // div.style.setProperty('background', 'pink');

      const start$ = fromEvent(div, 'mousedown');
      const move$ = fromEvent(document, 'mousemove');
      const end$ = fromEvent(document, 'mouseup');

      const drag$ = start$.pipe(
        switchMap(
          (start: MouseEvent) => {
            this.evPreventDefaultAndStopPropagation(start);
            div.style.borderLeft = 'dashed lightgray 1px';
            const resizerOffsetLeft = div.offsetLeft;

            const tableWidth = this.getWidthFromStyle(table);
            const baseTdWidth = this.getWidthFromStyle(baseTd);
            const nextTdWidth = this.getWidthFromStyle(nextTd);

            // console.warn('tableWidth = ', tableWidth);
            // console.warn('baseTdWidth = ', baseTdWidth);
            // console.warn('nextTdWidth = ', nextTdWidth);

            const styleAttr = table.getAttribute(TABLE_STYLE_ATTR);
            // console.warn('styleAttr = ', styleAttr);
            // console.warn('styleAttr === TableStyle.SCROLL = ', styleAttr === TableStyle.SCROLL);

            return move$.pipe(
              throttleTime(12),
              tap((move: MouseEvent) => {
                this.evPreventDefaultAndStopPropagation(move);
                const nowPoint = move;

                const diffX = nowPoint.clientX - start.clientX;

                const bWidth = baseTdWidth + diffX;
                const nWidth = nextTdWidth - diffX;

                // console.log('-----------------');
                // console.warn('    diffX = ', diffX);
                // console.warn('    bWidth = ', bWidth);
                // console.warn('    nWidth = ', nWidth);

                if (styleAttr !== TableStyle.SCROLL) {
                  if (diffX < 0 && bWidth <= 100) { return; }
                  if (diffX > 0 && nWidth <= 100) { return; }
                }

                div.style.setProperty('left', `${resizerOffsetLeft + diffX}px`);

                baseTd.style.setProperty('width', `${bWidth}px`);

                if (styleAttr === TableStyle.SCROLL) {
                  const tWidth = tableWidth + diffX;
                  table.removeAttribute('style');
                  table.setAttribute('style', `min-width: ${tWidth}px; width: ${tWidth}px;`);
                } else {
                  nextTd.style.setProperty('width', `${nWidth}px`);
                  this.checkTableColsWidth(table, true);
                }

              }),
              takeUntil(end$.pipe(
                tap((end: MouseEvent) => {
                  this.evPreventDefaultAndStopPropagation(end);
                  div.style.removeProperty('border-left');
                  this.checkTBodyTdsWidth(table);
                  this.registerColResizer(editorContainer, table);
                })
              ))
            );
          }
        )
      ).subscribe();

      // tslint:disable-next-line: no-string-literal
      div['drag$'] = drag$;
      container.appendChild(div);
    });

    table.parentNode.insertBefore(container, table);
  }

  unregisterColResizer(editorContainer: HTMLDivElement) {
    const containers = Array.from(editorContainer.querySelectorAll('.col-resizer-container')) as HTMLElement[];
    containers.forEach(container => {
      const resizers = Array.from(container.children) as HTMLElement[];
      resizers.forEach(resizer => {
        // tslint:disable-next-line: no-string-literal
        const drag$ = resizer['drag$'] as Subscription;
        drag$?.unsubscribe();
        resizer.parentNode.removeChild(resizer);
      });
      container.parentNode.removeChild(container);
    });
  }

}
