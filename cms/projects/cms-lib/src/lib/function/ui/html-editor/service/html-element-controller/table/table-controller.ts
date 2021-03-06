import { fromEvent, Subscription, merge, Observable, of } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { HtmlEditorElementController } from '../_base';
import { HtmlEditorContextMenuItem, HtmlEditorContext } from '../../../html-editor.interface';
import { HtmlEditorTableControllerInterface, HtmlEditorTableCell } from './table-controller.interface';
import { TableControllerService, TableStyle, TableFormat } from './table-controller-service';
import { DeleteRow } from './actions/delete-row';
import { AddRow } from './actions/add-row';
import { DeleteCol } from './actions/delete-col';
import { Merge } from './actions/merge';
import { Split } from './actions/split';
import { DeleteTable } from './actions/delete-table';
import { MarkCol } from './actions/mark-col';
import { AddCol } from './actions/add-col';
import { HtmlEditorActionCategory } from '../../../actions/action.enum';
import { TABLE_CLASS_NEUX_TABLE_WRAP, TABLE_CLASS_NEUX_TABLE } from '../../../const/html-editor-container.const';

let tableIndex = 0;

export class HtmlEditorTableController extends HtmlEditorElementController<HTMLTableElement> implements HtmlEditorTableControllerInterface {

  private contextMenuItemsTemp: HtmlEditorContextMenuItem[];
  get contextMenuItems(): HtmlEditorContextMenuItem[] {
    const menuItems: HtmlEditorContextMenuItem[] = [].concat(this.contextMenuItemsTemp);
    if (!menuItems?.length) { return menuItems; }

    setTimeout(_ => {
      const tableStyle = this.tableControllerService.getTableStyle(this.el);

      const rowItem = this.findContextMenuItemById(menuItems, 'row');
      rowItem.disabled = !this.selectedRows.length;

      const colItem = this.findContextMenuItemById(menuItems, 'col');
      colItem.disabled = !this.selectedCols.length;

      const mergeItem = this.findContextMenuItemById(menuItems, 'merge');
      mergeItem.disabled = this.selectedCols.length < 2 || tableStyle === TableStyle.SINGLE;

      const splitItem = this.findContextMenuItemById(menuItems, 'split');
      splitItem.disabled = this.selectedCols.length !== 1 || (this.selectedCols[0].colSpan < 2 && this.selectedCols[0].rowSpan < 2);
      if (!splitItem.disabled) {
        const col = this.selectedCols[0];
        const horizontal = this.findContextMenuItemById(splitItem.children, 'split-horizontal');
        horizontal.disabled = col.rowSpan <= 1;
        const verticle = this.findContextMenuItemById(splitItem.children, 'split-vertical');
        verticle.disabled = col.colSpan <= 1;
      }

      const styleItem = this.findContextMenuItemById(menuItems, 'style');
      styleItem.defaultValue = tableStyle;
      const styleItemSingleOption = styleItem.selectionOptions.find(option => option.value === TableStyle.SINGLE);
      styleItemSingleOption.disabled = false;
      const tds = Array.from(this.el.querySelectorAll('tbody > tr > td')) as HTMLTableDataCellElement[];
      const hasMergedCol = tds.some(td => td.colSpan > 1 || td.rowSpan > 1);
      styleItemSingleOption.disabled = hasMergedCol;

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
    this.tableControllerService = new TableControllerService(this.context.simpleWysiwygService);
  }

  private findContextMenuItemById(items: HtmlEditorContextMenuItem[], id: string) {
    return items.find(item => item.id === id);
  }

  protected onAddToEditor(): void {
    this.contextMenuItemsTemp = [
      {
        id: 'format',
        text: '表格格式', type: 'select',
        category: HtmlEditorActionCategory.TABLE,
        defaultValue: this.tableControllerService.getTableFormat(this.el),
        selectionOptions: [
          { text: '橫式', value: TableFormat.HORIZONTAL },
          { text: '直式', value: TableFormat.VERTICLE },
          { text: '混合', value: TableFormat.MIXED },
        ],
        selectionChange: (ev) => {
          this.tableControllerService.setTableFormat(this.el, ev.value);
          this.tableControllerService.registerColResizer(this.tableIndex, this.context.editorContainer, this.el);
        }
      },
      {
        id: 'style',
        text: '表格樣式', type: 'select',
        category: HtmlEditorActionCategory.TABLE,
        defaultValue: this.tableControllerService.getTableStyle(this.el),
        selectionOptions: [
          { text: '滿版縮放', value: TableStyle.PERCENT },
          { text: 'Scroll', value: TableStyle.SCROLL },
          { text: '單筆顯示', value: TableStyle.SINGLE },
        ],
        selectionChange: (ev) => {
          const tableWraps =
            Array.from(this.context.editorContainer.querySelectorAll(`.${TABLE_CLASS_NEUX_TABLE_WRAP}`)) as HTMLDivElement[];
          const tables = Array.from(this.context.editorContainer.querySelectorAll(`.${TABLE_CLASS_NEUX_TABLE}`));
          const wrap = tableWraps[tables.indexOf(this.el)];
          this.tableControllerService.setTableStyle(wrap, this.el, ev.value);
          this.tableControllerService.registerColResizer(this.tableIndex, this.context.editorContainer, this.el);
        }
      },
      {
        id: 'row',
        text: '列',
        category: HtmlEditorActionCategory.TABLE,
        children: [
          {
            id: 'row-add-top',
            category: HtmlEditorActionCategory.TABLE, text: '上方列', icon: 'add', action: new AddRow(this.context, this, 'before')
          },
          {
            id: 'row-add-bottom',
            category: HtmlEditorActionCategory.TABLE, text: '下方列', icon: 'add', action: new AddRow(this.context, this, 'after')
          },
          {
            id: 'row-delete',
            category: HtmlEditorActionCategory.TABLE, text: '刪除列', icon: 'delete', action: new DeleteRow(this.context, this)
          },
        ]
      },
      {
        id: 'col',
        text: '欄',
        category: HtmlEditorActionCategory.TABLE,
        children: [
          {
            id: 'col-mark',
            category: HtmlEditorActionCategory.TABLE, text: '標記/取消', action: new MarkCol(this.context, this)
          },
          {
            id: 'col-left',
            category: HtmlEditorActionCategory.TABLE, text: '左側欄', icon: 'add', action: new AddCol(this.context, this, 'left')
          },
          {
            id: 'col-right',
            category: HtmlEditorActionCategory.TABLE, text: '右側欄', icon: 'add', action: new AddCol(this.context, this, 'right')
          },
          {
            id: 'col-delete',
            category: HtmlEditorActionCategory.TABLE, text: '刪除欄', icon: 'delete', action: new DeleteCol(this.context, this)
          },
        ]
      },
      {
        id: 'merge',
        category: HtmlEditorActionCategory.TABLE, text: '合併', action: new Merge(this.context, this),
      },
      {
        id: 'split',
        text: '分割',
        category: HtmlEditorActionCategory.TABLE,
        children: [
          {
            id: 'split-horizontal',
            category: HtmlEditorActionCategory.TABLE, text: '水平分割', icon: 'delete', action: new Split(this.context, this, 'horizontal')
          },
          {
            id: 'split-vertical',
            category: HtmlEditorActionCategory.TABLE, text: '垂直分割', icon: 'delete', action: new Split(this.context, this, 'verticle')
          },
        ]
      },
      {
        id: 'delete',
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
        const cells = (Array.from(row.childNodes) as HTMLTableDataCellElement[]).filter(c => c.tagName?.toLowerCase() === 'td');
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
    this.el.id = this.el.id || `${new Date().getTime()}`;
    if (!this.el.classList.contains(TABLE_CLASS_NEUX_TABLE)) {
      this.el.classList.add(TABLE_CLASS_NEUX_TABLE);
    }

    const tableWrap: HTMLDivElement =
      this.context.editorContainer.querySelector(`[tableid=t${this.el.id}]`)
      || this.tableControllerService.createTableWrap(this.el);

    this.tableControllerService.setTableStyle(tableWrap, this.el);

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

    this.tableControllerService.checkTableStyle(this.el);

    if (scanTable) {
      this.scanTable(this.el);
    }
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
