import { HtmlEditorTableCell } from './table-controller.interface';
import { Subscription, fromEvent } from 'rxjs';
import { switchMap, takeUntil, tap, throttleTime } from 'rxjs/operators';
import { TABLE_BASE_ROW_CLASS } from '../../../const/html-editor-container.const';

export interface TableSetting {
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
    // td.setAttribute('class', 'tg-0pky');
    td.setAttribute('colspan', '1');
    td.setAttribute('rowspan', '1');
    return td;
  }

  createTable(config: { rows: number, cols: number }) {
    const table = document.createElement('table');

    table.classList.add('neux-table');
    this.setTableStyle(table, TableStyle.PERCENT);

    const tHead = document.createElement('thead');
    const tBody = document.createElement('tbody');
    table.appendChild(tHead);
    table.appendChild(tBody);

    const baseRow = document.createElement('tr');
    baseRow.classList.add(TABLE_BASE_ROW_CLASS);

    for (let col = 0; col < config.cols; ++col) {
      const td = this.createCell();
      baseRow.appendChild(td);
    }
    tHead.appendChild(baseRow);

    for (let row = 0; row < config.rows; ++row) {
      const tr = document.createElement('tr');
      for (let col = 0; col < config.cols; ++col) {
        const td = this.createCell();
        tr.appendChild(td);
      }
      tBody.appendChild(tr);
    }

    this.checkTableStyle(table);
    return table;
  }

  checkTableStyle(table: HTMLTableElement) {
    this.setBaseRowStyle(table);
    this.setHeaderRowStyle(table);
  }

  private setBaseRowStyle(table: HTMLTableElement) {
    const tr = table.querySelector(`thead > tr.${TABLE_BASE_ROW_CLASS}`) as HTMLTableRowElement;
    const tds = Array.from(tr.querySelectorAll('td')) as HTMLTableDataCellElement[];
    tds.forEach(td => {
      td.classList.add('hideTD');
    });
  }

  private setHeaderRowStyle(table: HTMLTableElement) {
    const firstTr = table.querySelector(`tbody > tr`) as HTMLTableRowElement;
    const firstTrTds = Array.from(firstTr.querySelectorAll('td')) as HTMLTableDataCellElement[];
    firstTrTds.forEach(td => {
      td.classList.add('headerTD');
    });

    const otherTrs = Array.from(table.querySelectorAll(`tbody > tr`)).filter(tr => tr !== firstTr) as HTMLTableRowElement[];
    otherTrs.forEach(otherTr => {
      const otherTrTds = Array.from(otherTr.querySelectorAll('td')) as HTMLTableDataCellElement[];
      otherTrTds.forEach(td => {
        td.classList.remove('headerTD');
      });
    });
  }

  setTableStyle(table: HTMLTableElement, style: TableStyle) {
    table.setAttribute(TABLE_STYLE_ATTR, style);

    if (style !== TableStyle.SCROLL) {
      table.setAttribute('style', 'width:100% !important;');
    } else {
      table.setAttribute('style', `min-width: ${table.offsetWidth}px; width: ${table.offsetWidth}px;`);
    }

    this.checkTableColsWidth(table);
  }

  getTableStyle(table: HTMLTableElement): TableStyle {
    const style = table.getAttribute(TABLE_STYLE_ATTR) as TableStyle;
    switch (style) {
      case TableStyle.PERCENT:
        break;
      case TableStyle.SCROLL:
        break;
      case TableStyle.SINGLE:
        break;
    }
    return style;
  }

  getWidthFromStyle(col: HTMLElement) {
    return +(col.style.getPropertyValue('width').replace('px', '').replace('%', ''));
  }

  checkTableColsWidth(table: HTMLTableElement) {
    this.checkTHeadTdsWidth(table);
  }

  checkTHeadTdsWidth(table: HTMLTableElement) {
    const baseTds = Array.from(table.querySelectorAll('thead > tr > td')) as HtmlEditorTableCell[];
    const tableStyle = this.getTableStyle(table);
    if (baseTds.every(td => !this.getWidthFromStyle(td))) { // 初始時
      const width = tableStyle === TableStyle.PERCENT
        ? `${Number.parseFloat('' + (100 / baseTds.length)).toFixed(2)}%`
        : `${table.clientWidth / baseTds.length}px`;
      baseTds.forEach(td => {
        td.style.setProperty('width', width);
      });
    } else {
      baseTds.map(td => ({
        td,
        width: tableStyle === TableStyle.PERCENT
          ? `${Number.parseFloat('' + (td.clientWidth / table.clientWidth * 100)).toFixed(2)}%`
          : `${table.clientWidth / baseTds.length}px`
      })).forEach(({ td, width }) => td.style.setProperty('width', width));
    }
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

  getCellStartEnd(cell: HtmlEditorTableCell) {
    const pos = cell.cellPos;
    const rowStart = pos.top;
    const rowEnd = rowStart + cell.rowSpan;
    const colStart = pos.left;
    const colEnd = colStart + cell.colSpan;

    const startEnd = { rowStart, rowEnd, colStart, colEnd };
    return startEnd;
  }

  getStartEndByStartCellAndEndCell(start: HTMLTableDataCellElement, end: HTMLTableDataCellElement) {
    const startPos = (start as HtmlEditorTableCell).cellPos;
    const endPos = (end as HtmlEditorTableCell).cellPos;

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

  registerColResizer(tableIndex: number, editorContainer: HTMLDivElement, table: HTMLTableElement) {
    if (!editorContainer || !table.parentNode) { return; }
    this.unregisterColResizer(tableIndex, editorContainer);

    const baseTds = Array.from(table.querySelectorAll('thead > tr > td')) as HtmlEditorTableCell[];
    const container = document.createElement('div');
    container.classList.add(`table-${tableIndex}`);
    container.classList.add('col-resizer-container');
    container.setAttribute('contenteditable', 'false');
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
      // console.warn('baseTd.clientWidth = ', baseTd.clientWidth);
      // console.warn('baseTd.width = ', baseTd.width);
      // console.warn('baseTd.height = ', baseTd.height);

      const div = document.createElement('div');
      div.classList.add('col-resizer');
      div.setAttribute('contenteditable', 'false');
      div.style.setProperty('cursor', 'ew-resize');
      div.style.setProperty('position', 'absolute');
      div.style.setProperty('top', '0');
      div.style.setProperty('left', `${baseTd.offsetLeft + baseTd.clientWidth}px`);
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

            // const tableWidth = this.getWidthFromStyle(table);
            // const baseTdWidth = this.getWidthFromStyle(baseTd);
            // const nextTdWidth = this.getWidthFromStyle(nextTd);
            const tableWidth = table.clientWidth;
            const baseTdWidth = baseTd.clientWidth;
            const nextTdWidth = nextTd.clientWidth;

            // console.warn('tableWidth = ', tableWidth);
            // console.warn('baseTdWidth = ', baseTdWidth);
            // console.warn('nextTdWidth = ', nextTdWidth);

            const styleAttr = this.getTableStyle(table);
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

                if (bWidth <= 100) { return; }

                div.style.setProperty('left', `${resizerOffsetLeft + diffX}px`);

                const newBWidth = styleAttr === TableStyle.PERCENT
                  ? `${Number.parseFloat('' + (bWidth / tableWidth * 100)).toFixed(2)}%`
                  : `${bWidth}px`;

                const newNWidth = styleAttr === TableStyle.PERCENT
                  ? `${Number.parseFloat('' + (nWidth / tableWidth * 100)).toFixed(2)}%`
                  : `${nWidth}px`;

                baseTd.style.setProperty('width', newBWidth);
                nextTd.style.setProperty('width', newNWidth);
              }),
              takeUntil(end$.pipe(
                tap((end: MouseEvent) => {
                  this.evPreventDefaultAndStopPropagation(end);
                  div.style.removeProperty('border-left');
                  this.registerColResizer(tableIndex, editorContainer, table);
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

  unregisterColResizer(tableIndex: number, editorContainer: HTMLDivElement) {
    const containers = Array.from(editorContainer.querySelectorAll(`.table-${tableIndex}.col-resizer-container`)) as HTMLElement[];
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
