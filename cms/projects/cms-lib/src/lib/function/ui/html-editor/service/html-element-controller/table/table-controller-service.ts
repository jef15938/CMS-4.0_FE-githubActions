import { HtmlEditorTableCell } from './table-controller.interface';
import { Subscription, fromEvent } from 'rxjs';
import { switchMap, takeUntil, tap, throttleTime } from 'rxjs/operators';
import { TABLE_CLASS_BASE_ROW, TABLE_ATTR_TABLE_STYLE, TABLE_CLASS_TABLE_TD, TABLE_ATTR_TABLE_FORMAT, TABLE_CLASS_NEUX_TABLE, TABLE_CLASS_NEUX_TABLE_WRAP } from '../../../const/html-editor-container.const';
import { SimpleWysiwygService } from '../../simple-wysiwyg.service';

export enum TableFormat {
  HORIZONTAL = 'horizontal',
  VERTICLE = 'vertical',
  MIXED = 'mixed',
}

export class HtmlEditorTableHeaderUtil {

  setTableFormat(table: HTMLTableElement, tableFormat: TableFormat) {
    table.setAttribute(TABLE_ATTR_TABLE_FORMAT, tableFormat);
    this.setHeaderClass(table);
  }

  private checkTableFormat(table: HTMLTableElement) {
    const formatAttr = table.getAttribute(TABLE_ATTR_TABLE_FORMAT) || '';
    const enumTableFormatValues = Object.keys(TableFormat).map(key => TableFormat[key]);
    if (enumTableFormatValues.every(value => formatAttr !== value)) {
      table.setAttribute(TABLE_ATTR_TABLE_FORMAT, TableFormat.HORIZONTAL);
    }
  }

  getTableFormat(table: HTMLTableElement): TableFormat {
    this.checkTableFormat(table);
    return table.getAttribute(TABLE_ATTR_TABLE_FORMAT) as TableFormat;
  }

  private removeHeaderClass(el: HTMLElement) {
    el.classList.remove(TABLE_CLASS_TABLE_TD);
  }

  private addHeaderClass(el: HTMLTableDataCellElement) {
    el.classList.add(TABLE_CLASS_TABLE_TD);
  }

  private cleanHeaderClass(table: HTMLTableElement) {
    const tds = Array.from(table.querySelectorAll('td')) as HTMLTableDataCellElement[];
    const ths = Array.from(table.querySelectorAll('th')) as HTMLTableHeaderCellElement[];
    [...tds, ...ths].forEach(el => this.removeHeaderClass(el));
  }

  private addHeaderClassHorizontal(table: HTMLTableElement) {
    const firstTr = table.querySelector(`tbody > tr`) as HTMLTableRowElement;
    const firstTrTds = Array.from(firstTr.querySelectorAll('td')) as HTMLTableDataCellElement[];
    firstTrTds.forEach(td => this.addHeaderClass(td));
  }

  private addHeaderClassVertical(table: HTMLTableElement) {
    const firstTds = Array.from(table.querySelectorAll(`tbody td:first-child`)) as HTMLTableDataCellElement[];
    firstTds.forEach(td => this.addHeaderClass(td));
  }

  setHeaderClass(table: HTMLTableElement) {
    this.cleanHeaderClass(table);
    const tableFormat = this.getTableFormat(table);
    switch (tableFormat) {
      case TableFormat.HORIZONTAL:
        this.addHeaderClassHorizontal(table);
        break;
      case TableFormat.VERTICLE:
        this.addHeaderClassVertical(table);
        break;
      case TableFormat.MIXED:
        this.addHeaderClassHorizontal(table);
        this.addHeaderClassVertical(table);
        break;
    }
  }
}

export interface TableSetting {
  cols: number;
  style: TableStyle;
}

export enum TableStyle {
  PERCENT = 'percent',
  SCROLL = 'scroll',
  SINGLE = 'single',
}

export class TableControllerService {

  private readonly htmlEditorTableHeaderUtil = new HtmlEditorTableHeaderUtil();

  constructor(
    private simpleWysiwygService: SimpleWysiwygService,
  ) {

  }

  getTableFormat(table: HTMLTableElement) {
    return this.htmlEditorTableHeaderUtil.getTableFormat(table);
  }

  setTableFormat(table: HTMLTableElement, tableFormat: TableFormat) {
    return this.htmlEditorTableHeaderUtil.setTableFormat(table, tableFormat);
  }

  createCell(innerHTML?: string) {
    const td = document.createElement('td');
    // td.innerHTML = '<div>文字</div>';
    td.innerHTML = (innerHTML === null || innerHTML === undefined) ? '文字' : innerHTML;
    // td.setAttribute('class', 'tg-0pky');
    td.setAttribute('colspan', '1');
    td.setAttribute('rowspan', '1');
    return td;
  }

  private createTable(config: { rows: number, cols: number }) {
    const table = document.createElement('table');
    table.classList.add(TABLE_CLASS_NEUX_TABLE);

    const tHead = document.createElement('thead');
    const tBody = document.createElement('tbody');
    table.appendChild(tHead);
    table.appendChild(tBody);

    const baseRow = document.createElement('tr');
    baseRow.classList.add(TABLE_CLASS_BASE_ROW);

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
    return table;
  }

  createTableWrap(table: HTMLTableElement) {
    table.id = table.id || `${new Date().getTime()}`;
    const tableWrap = document.createElement('p');
    tableWrap.setAttribute('tableid', `t${table.id}`);
    tableWrap.classList.add(TABLE_CLASS_NEUX_TABLE_WRAP);
    const nextOfAddedTable = table.nextElementSibling;
    if (nextOfAddedTable) {
      table.parentElement.insertBefore(tableWrap, nextOfAddedTable);
    } else {
      table.parentElement.appendChild(tableWrap);
    }
    tableWrap.appendChild(table);
    this.simpleWysiwygService.insertBlankRowToElement(tableWrap);
    return tableWrap;
  }

  createEditorTable(container: HTMLDivElement, config: { rows: number, cols: number }) {
    const table = this.createTable(config);
    const addedTable = this.simpleWysiwygService.insertHtmlElement(table, container);
    const tableWrap = this.createTableWrap(addedTable);
    this.setTableStyle(tableWrap, addedTable);
    this.checkTableStyle(addedTable);
    return addedTable;
  }

  checkTableStyle(table: HTMLTableElement) {
    this.setBaseRowStyle(table);
    this.htmlEditorTableHeaderUtil.setHeaderClass(table);
  }

  private setBaseRowStyle(table: HTMLTableElement) {
    let tHead = table.querySelector('thead');
    if (!tHead) {
      tHead = document.createElement('tHead') as HTMLTableSectionElement;
      if (table.firstElementChild) {
        table.insertBefore(tHead, table.firstElementChild);
      } else {
        table.appendChild(tHead);
      }
    }

    let baseRow = tHead.querySelector(`tr.${TABLE_CLASS_BASE_ROW}`);
    if (!baseRow) {
      baseRow = document.createElement('tr') as HTMLTableRowElement;
      baseRow.classList.add(TABLE_CLASS_BASE_ROW);

      const firstTr = table.querySelector('tr');
      const firstTrTds = Array.from(firstTr.querySelectorAll('td'));
      const colSpans = firstTrTds
        .map(td => td.colSpan)
        .reduce((result, colSpan) => result += colSpan, 0);

      for (let i = 0, l = colSpans; i < l; ++i) {
        const td = this.createCell();
        baseRow.appendChild(td);
      }

      if (tHead.firstElementChild) {
        tHead.insertBefore(baseRow, tHead.firstElementChild);
      } else {
        tHead.appendChild(baseRow);
      }
    }

    const tds = Array.from(baseRow.querySelectorAll('td') || []) as HTMLTableDataCellElement[];
    tds.forEach(td => {
      td.classList.add('hideTD');
      td.innerHTML = '';
    });
  }

  setTableStyle(wrapper: HTMLDivElement, table: HTMLTableElement, style = TableStyle.PERCENT) {
    table.setAttribute(TABLE_ATTR_TABLE_STYLE, style);
    wrapper.setAttribute(TABLE_ATTR_TABLE_STYLE, style);
    if (style !== TableStyle.SCROLL) {
      table.setAttribute('style', 'width:100% !important;');
    } else {
      table.removeAttribute('style');
      // table.setAttribute('style', `min-width: ${table.offsetWidth}px; width: ${table.offsetWidth}px;`);
    }
    this.checkTableColsWidth(table);
  }

  getTableStyle(table: HTMLTableElement): TableStyle {
    const style = table.getAttribute(TABLE_ATTR_TABLE_STYLE) as TableStyle;
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

    const tableStype = this.getTableStyle(table);
    const isScroll = tableStype === TableStyle.SCROLL;
    const isPercent = tableStype === TableStyle.PERCENT;

    baseTds.forEach((baseTd, i) => {

      // if (i === baseTds.length - 1) { return; }
      const isLatestCol = i === baseTds.length - 1;
      // console.log('--------------------------------------');
      // console.warn('baseTd = ', baseTd);

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

      const dragger = document.createElement('div');
      dragger.classList.add('col-resizer');
      dragger.setAttribute('contenteditable', 'false');
      dragger.style.setProperty('cursor', 'ew-resize');
      dragger.style.setProperty('position', 'absolute');
      dragger.style.setProperty('top', '0');
      dragger.style.setProperty('width', '10px');
      dragger.style.setProperty('left', `${baseTd.offsetLeft + baseTd.clientWidth - 5}px`);
      dragger.style.setProperty('height', `${table.clientHeight}px`);
      // dragger.style.setProperty('background', 'pink');

      const start$ = fromEvent(dragger, 'mousedown');
      const move$ = fromEvent(document, 'mousemove');
      const end$ = fromEvent(document, 'mouseup');

      const drag$ = start$.pipe(
        switchMap(
          (start: MouseEvent) => {
            this.evPreventDefaultAndStopPropagation(start);
            dragger.style.borderLeft = 'dashed lightgray 1px';
            const resizerOffsetLeft = dragger.offsetLeft;

            const tableWidth = table.clientWidth;
            const baseTdWidth = baseTd.clientWidth;

            // console.warn('tableWidth = ', tableWidth);
            // console.warn('baseTdWidth = ', baseTdWidth);
            // console.warn('nextTdWidth = ', nextTdWidth);

            return move$.pipe(
              throttleTime(12),
              tap((move: MouseEvent) => {
                this.evPreventDefaultAndStopPropagation(move);

                const tableStyle = this.getTableStyle(table);
                if (!isScroll && isLatestCol) { return; }

                // console.log('-----------------');
                const nowPoint = move;
                const diffX = nowPoint.clientX - start.clientX;
                // console.warn('    diffX = ', diffX);

                dragger.style.setProperty('left', `${resizerOffsetLeft + diffX}px`);

                const bWidth = baseTdWidth + diffX;
                // console.warn('    bWidth = ', bWidth);
                if (bWidth <= 100) { return; }

                const newBWidthNumber = isPercent
                  ? Number.parseFloat('' + (bWidth / tableWidth * 100))
                  : bWidth;

                const newBWidth = isPercent
                  ? `${newBWidthNumber.toFixed(2)}%`
                  : `${newBWidthNumber}px`;

                baseTd.style.setProperty('width', newBWidth);

                if (isScroll) { return; } // Scroll 時拉動只影響自己的寬度，不影響其他 col

                // 處理下一個 col
                const nextTd = baseTd.nextElementSibling as HTMLTableDataCellElement;
                // console.warn('nextTd = ', nextTd);
                const nextTdWidth = nextTd.clientWidth;
                // console.warn('    nextTdWidth = ', nextTdWidth);
                const nWidth = nextTdWidth - diffX;
                // console.warn('    nWidth = ', nWidth);

                let newNWidthNumber = 0;
                if (isPercent) {
                  const otherColTotalWidthPercent = baseTds
                    .filter(td => td !== baseTd && td !== nextTd)
                    .map(td => +td.style.width.replace('%', ''))
                    .reduce((currentTotal, width) => currentTotal + width, 0);
                  // console.warn({ newBWidthNumber, otherColTotalWidthPercent });
                  newNWidthNumber = (100 - newBWidthNumber - otherColTotalWidthPercent);
                  // console.warn('newNWidthNumber = ', newNWidthNumber);
                } else {
                  newNWidthNumber = nWidth;
                }

                const newNWidth = isPercent
                  ? `${newNWidthNumber.toFixed(2)}%`
                  : `${newNWidthNumber}px`;
                // console.warn('    newNWidth = ', newNWidth);

                nextTd.style.setProperty('width', newNWidth);
              }),
              takeUntil(end$.pipe(
                tap((end: MouseEvent) => {
                  this.evPreventDefaultAndStopPropagation(end);
                  dragger.style.removeProperty('border-left');

                  if (isScroll) { // Scroll 時計算 table 總寬度
                    const tableWidthPx = baseTds
                      .map(td => +td.style.width.replace('px', ''))
                      .reduce((currentTotal, width) => currentTotal + width, 0) + 'px';
                    table.setAttribute('style', `width:${tableWidthPx}`);
                  }

                  this.registerColResizer(tableIndex, editorContainer, table);
                })
              ))
            );
          }
        )
      ).subscribe();

      // tslint:disable-next-line: no-string-literal
      dragger['drag$'] = drag$;
      container.appendChild(dragger);
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
