import { fromEvent, Subscription, merge, Observable, of } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { HtmlEditorElementController } from '../_base';
import { HtmlEditorContextMenuItem, HtmlEditorContext } from '../../../html-editor.interface';
import { HtmlEditorTableControllerInterface, HtmlEditorTableCell } from './table-controller.interface';
import { TableControllerService, TABLE_STYLE_ATTR, TableStyle } from './table-controller-service';
import { DeleteRow } from './actions/delete-row';
import { AddRow } from './actions/add-row';
import { DeleteCol } from './actions/delete-col';
import { Merge } from './actions/merge';
import { Split } from './actions/split';
import { DeleteTable } from './actions/delete-table';
import { MarkCol } from './actions/mark-col';
import { AddCol } from './actions/add-col';
import { HtmlEditorActionCategory } from '../../../actions/action.enum';

let tableIndex = 0;

export class HtmlEditorTableController extends HtmlEditorElementController<HTMLTableElement> implements HtmlEditorTableControllerInterface {

  private contextMenuItemsTemp: HtmlEditorContextMenuItem[];
  get contextMenuItems(): HtmlEditorContextMenuItem[] {
    const menuItems: HtmlEditorContextMenuItem[] = [].concat(this.contextMenuItemsTemp);
    if (!menuItems?.length) { return menuItems; }

    setTimeout(_ => {
      const rowItem = menuItems[0];
      rowItem.disabled = !this.selectedRows.length;

      const colItem = menuItems[1];
      colItem.disabled = !this.selectedCols.length;

      const mergeItem = menuItems[2];
      mergeItem.disabled = this.selectedCols.length < 2;

      const splitItem = menuItems[3];
      splitItem.disabled = this.selectedCols.length !== 1 || (this.selectedCols[0].colSpan < 2 && this.selectedCols[0].rowSpan < 2);
      if (!splitItem.disabled) {
        const col = this.selectedCols[0];
        const horizontal = splitItem.children[0];
        horizontal.disabled = col.rowSpan <= 1;
        const verticle = splitItem.children[1];
        verticle.disabled = col.colSpan <= 1;
      }

      const styleItem = menuItems[4];
      const style = this.getTableStyle();
      styleItem.defaultValue = style;
      const styleItemSingleOption = menuItems[4].selectionOptions[2];
      styleItemSingleOption.disabled = false;
      if (style !== TableStyle.SINGLE) {
        const tds = Array.from(this.el.querySelectorAll('tbody > tr > td')) as HTMLTableDataCellElement[];
        const hasMergedCol = tds.some(td => td.colSpan > 1 || td.rowSpan > 1);
        if (hasMergedCol) {
          styleItemSingleOption.disabled = true;
        }
      }

    }, 100);

    return menuItems;
  }

  selectedCols: HTMLTableDataCellElement[] = [];
  selectedRows: HTMLTableRowElement[] = [];

  private subscriptions: Subscription[] = [];

  tableControllerService: TableControllerService;

  private selectCellSubscription: Subscription;

  tableIndex = tableIndex++;

  constructor(
    el: HTMLTableElement,
    context: HtmlEditorContext,
  ) {
    super(el, context);
    this.tableControllerService = new TableControllerService();
  }

  protected onAddToEditor(): void {
    this.contextMenuItemsTemp = [
      {
        text: '列',
        category: HtmlEditorActionCategory.TABLE,
        children: [
          { category: HtmlEditorActionCategory.TABLE, text: '上方列', icon: 'add', action: new AddRow(this.context, this, 'before') },
          { category: HtmlEditorActionCategory.TABLE, text: '下方列', icon: 'add', action: new AddRow(this.context, this, 'after') },
          { category: HtmlEditorActionCategory.TABLE, text: '刪除列', icon: 'delete', action: new DeleteRow(this.context, this) },
        ]
      },
      {
        text: '欄',
        category: HtmlEditorActionCategory.TABLE,
        children: [
          { category: HtmlEditorActionCategory.TABLE, text: '標記/取消', action: new MarkCol(this.context, this) },
          { category: HtmlEditorActionCategory.TABLE, text: '左側欄', icon: 'add', action: new AddCol(this.context, this, 'left') },
          { category: HtmlEditorActionCategory.TABLE, text: '右側欄', icon: 'add', action: new AddCol(this.context, this, 'right') },
          { category: HtmlEditorActionCategory.TABLE, text: '刪除欄', icon: 'delete', action: new DeleteCol(this.context, this) },
        ]
      },
      {
        category: HtmlEditorActionCategory.TABLE, text: '合併', action: new Merge(this.context, this),
      },
      {
        text: '分割',
        category: HtmlEditorActionCategory.TABLE,
        children: [
          { category: HtmlEditorActionCategory.TABLE, text: '水平分割', icon: 'delete', action: new Split(this.context, this, 'horizontal') },
          { category: HtmlEditorActionCategory.TABLE, text: '垂直分割', icon: 'delete', action: new Split(this.context, this, 'verticle') },
        ]
      },
      {
        text: '表格樣式', type: 'select',
        category: HtmlEditorActionCategory.TABLE,
        defaultValue: this.getTableStyle(),
        selectionOptions: [
          { text: '滿版縮放', value: TableStyle.PERCENT },
          { text: 'Scroll', value: TableStyle.SCROLL },
          { text: '單筆顯示', value: TableStyle.SINGLE },
        ],
        selectionChange: (ev) => {
          this.el.setAttribute(TABLE_STYLE_ATTR, ev.value);
          this.tableControllerService.checkTableColsWidth(this.el);
          this.tableControllerService.registerColResizer(this.tableIndex, this.context.editorContainer, this.el);
        }
      },
      {
        category: HtmlEditorActionCategory.TABLE, text: '刪除表格', action: new DeleteTable(this.context, this),
      },
    ];
    this.checkTableState();
    this.subscribeEvents();
    this.subscribeCellSelection();
    this.tableControllerService.registerColResizer(this.tableIndex, this.context.editorContainer, this.el);
  }

  protected onRemovedFromEditor(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
    this.contextMenuItemsTemp = undefined;
    this.unsubscribeCellSelection();
    this.tableControllerService.unregisterColResizer(this.tableIndex, this.context.editorContainer);
  }

  private getTableStyle(): TableStyle {
    const style = this.el.getAttribute(TABLE_STYLE_ATTR) as TableStyle;
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

  private subscribeEvents() {
    const selectionchange$ = fromEvent(document, 'selectionchange').subscribe(_ => {
      setTimeout(__ => {
        if (!this.context.isSelectionInsideEditorContainer) { return; }

        const range = this.context.simpleWysiwygService.getRange();
        if (this.context.simpleWysiwygService.isChildOf(range?.commonAncestorContainer, this.el)) {
          this.onSelected();
        } else {
          this.onUnselected();
        }
      }, 0);
    });
    this.subscriptions.push(selectionchange$);
  }


  private subscribeCellSelection() {
    this.selectCellSubscription?.unsubscribe();

    const evPreventDefaultAndStopPropagation = (source: Observable<MouseEvent>) => new Observable<MouseEvent>(observer => {
      return source.subscribe({
        next: (ev) => {
          this.evPreventDefaultAndStopPropagation(ev);
          observer.next(ev);
        },
        error(err) { observer.error(err); },
        complete() { observer.complete(); },
      });
    });

    const table = this.el;
    let startCell: HTMLTableDataCellElement;

    const selectTo = (currentCell: HTMLTableDataCellElement) => {
      const selectedColsStartEnd = this.tableControllerService.getStartEndByStartCellAndEndCell(startCell, currentCell);
      const trs = Array.from(this.el.querySelectorAll('tr'));
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < trs.length; ++i) {
        const row = trs[i];
        const cells = Array.from(row.childNodes) as HTMLTableDataCellElement[];

        cells.forEach((cell: HtmlEditorTableCell) => {
          const startEnd = this.tableControllerService.getCellStartEnd(cell);
          if (
            startEnd.rowStart >= selectedColsStartEnd.rowStart
            && startEnd.rowEnd <= selectedColsStartEnd.rowEnd
            && startEnd.colStart >= selectedColsStartEnd.colStart
            && startEnd.colEnd <= selectedColsStartEnd.colEnd
          ) {
            cell?.classList.add('selected');
          }
        });
      }
    };

    const removeAllSelected = () => {
      table.querySelectorAll('.selected').forEach(td => {
        td.classList.remove('selected');
      });
    };

    const tds = Array.from(table.querySelectorAll('td')) as HTMLElement[];

    const mousedown$: Observable<MouseEvent> = merge(
      ...tds.map(td => fromEvent(td, 'mousedown'))
    ) as Observable<any>;

    const mouseover$: Observable<MouseEvent> = merge(
      ...tds.map(td => fromEvent(td, 'mouseover'))
    ).pipe(evPreventDefaultAndStopPropagation);

    const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup').pipe(evPreventDefaultAndStopPropagation);

    const drag$ = mousedown$.pipe(
      switchMap(start => {
        const cell = this.context.simpleWysiwygService.findTagFromTargetToContainer(
          this.context.editorContainer, start.target as HTMLElement, 'td'
        ) as HTMLTableDataCellElement;

        if (!cell) { return undefined; }
        if (start.button === 2) { return of(undefined); } // right click
        if (!(start.ctrlKey || start.metaKey)) {
          removeAllSelected();
        } // 多選

        if (!cell.classList.contains('selected')) {
          cell.classList.add('selected');
        } else {
          cell.classList.remove('selected');
        }

        startCell = cell;

        if (!(start.shiftKey)) { return of(undefined); } // 拖拉多選
        start.stopPropagation();
        start.preventDefault();

        return mouseover$.pipe(
          tap(over => {
            // console.warn('over = ', over);
            removeAllSelected();
            selectTo(
              this.context.simpleWysiwygService
                .findTagFromTargetToContainer(this.context.editorContainer, over.target as HTMLElement, 'td') as HTMLTableDataCellElement
            );
          }),
          takeUntil(mouseup$.pipe(
            tap(end => {
              // console.warn('end = ', end);
              this.checkTableState(false);
            })
          ))
        );
      })
    );

    this.selectCellSubscription = drag$.subscribe();
  }

  private unsubscribeCellSelection() {
    this.selectCellSubscription?.unsubscribe();
    const tds = Array.from(this.el.querySelectorAll('.selected')) as HTMLElement[];
    tds.forEach(td => td.classList.remove('selected'));
    this.checkTableState();
  }

  private onSelected(): void {
    this.el.classList.add('selected');
    if (!this.selectedCols.length) {
      const range = this.context.simpleWysiwygService.getRange();
      const td = this.context.simpleWysiwygService.findTagFromTargetToContainer(
        this.context.editorContainer, range.commonAncestorContainer as HTMLElement, 'td'
      ) as HTMLTableDataCellElement;
      if (td) {
        td.classList.add('selected');
        this.selectedCols.push(td);
      }
    }
    this.checkTableState();
    this.subscribeCellSelection();
    this.tableControllerService.registerColResizer(this.tableIndex, this.context.editorContainer, this.el);
  }

  private onUnselected(): void {
    this.el.classList.remove('selected');
    this.unsubscribeCellSelection();
    this.checkTableState();
    this.tableControllerService.registerColResizer(this.tableIndex, this.context.editorContainer, this.el);
  }

  private evPreventDefaultAndStopPropagation = (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
  }

  checkTableState(scanTable = true) {
    this.selectedCols = Array.from(this.el.querySelectorAll('td.selected'));
    this.selectedRows = this.selectedCols
      .map(col => col.parentElement)
      .filter((row, i, arr) => arr.indexOf(row) === i) as HTMLTableRowElement[];

    let trs = Array.from(this.el.querySelectorAll('tr'));
    trs.forEach(tr => {
      if (!tr.childElementCount) {
        tr.parentNode.removeChild(tr);
      }
    });
    trs = Array.from(this.el.querySelectorAll('tr'));
    if (!trs.length) {
      this.el.parentNode.removeChild(this.el);
    }

    const tHeadTds = Array.from(this.el.querySelectorAll('thead > tr > td')) as HTMLTableDataCellElement[];
    tHeadTds.forEach(td => {
      this.tableControllerService.setTHeadTd(td);
    });

    if (scanTable) {
      this.scanTable(this.el);
    }

    this.tableControllerService.checkTableColsWidth(this.el);
  }

  private scanTable(table) {
    const m = [];
    for (let y = 0; y < table.rows.length; y++) {
      const row = table.rows[y];
      for (let x = 0; x < row.cells.length; x++) {
        const cell = row.cells[x];
        let xx = x;
        let tx;
        let ty;
        for (; m[y] && m[y][xx]; ++xx) { } // skip already occupied cells in current row
        for (tx = xx; tx < xx + cell.colSpan; ++tx) // mark matrix elements occupied by current cell with true
        {
          for (ty = y; ty < y + cell.rowSpan; ++ty) {
            if (!m[ty]) { m[ty] = []; } // fill missing rows
            m[ty][tx] = true;
          }
        }
        // do here whatever you want with
        // xx: the horizontal offset of the cell
        // y: the vertical offset of the cell
        const pos = { top: y, left: xx };
        cell.cellPos = pos;
      }
    }
  }

}
