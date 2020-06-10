import { HtmlEditorElementController } from './../_base';
import { fromEvent, Subscription, merge, Observable, of, concat } from 'rxjs';
import { IHtmlEditorContextMenuItem, IHtmlEditorContext } from '../../../html-editor.interface';
import { DeleteRow } from './actions/delete-row';
import { AddRow } from './actions/add-row';
import { ITableController, ITableSetting } from './table-controller.interface';
import { DeleteCol } from './actions/delete-col';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { Merge } from './actions/merge';
import { Split } from './actions/split';
import { DeleteTable } from './actions/delete-table';
import { TableControllerService } from './table-controller-service';

export class HtmlEditorTableController extends HtmlEditorElementController<HTMLTableElement> implements ITableController {

  private _contextMenuItems: IHtmlEditorContextMenuItem[];
  get contextMenuItems(): IHtmlEditorContextMenuItem[] {
    const menuItems: IHtmlEditorContextMenuItem[] = [].concat(this._contextMenuItems);
    if (!menuItems?.length) { return; }

    setTimeout(_ => {
      const rowItem = menuItems[0];
      rowItem.disabled = !this.selectedRows.length;

      const colItem = menuItems[1];
      colItem.disabled = !this.selectedCols.length;

      const mergeItem = menuItems[2];
      mergeItem.disabled = !this.selectedCols.length || this.selectedCols.length < 2;
      if (!mergeItem.disabled) { // 行要連續
        if (this.selectedRows.length > 1 && !this.selectedRows.every((row, rowIndex, arr) => {
          if (rowIndex !== 0) {
            const previousSelectedRow = arr[rowIndex - 1];
            const previousRow = row.previousSibling as HTMLTableRowElement;
            return previousSelectedRow === previousRow;
          };
          return true;
        })) {
          mergeItem.disabled = true;
        }
      }

      const splitItem = menuItems[3];
      splitItem.disabled = this.selectedCols.length !== 1 || (this.selectedCols[0].colSpan < 2 && this.selectedCols[0].rowSpan < 2);
      if (!splitItem.disabled) {
        const col = this.selectedCols[0];
        const horizontal = splitItem.children[0];
        horizontal.disabled = col.rowSpan <= 1;
        const verticle = splitItem.children[1];
        verticle.disabled = col.colSpan <= 1;
      }
    }, 100)

    return menuItems;
  };

  selectedCols: HTMLTableDataCellElement[] = [];
  selectedRows: HTMLTableRowElement[] = [];

  private _tableSetting: ITableSetting;
  private _subscriptions: Subscription[] = [];

  private _tableControllerService: TableControllerService;

  private _selectCellSubscription: Subscription;

  constructor(
    el: HTMLTableElement,
    context: IHtmlEditorContext,
  ) {
    super(el, context);
    this._tableControllerService = new TableControllerService();
  }

  protected onAddToEditor(): void {
    this._contextMenuItems = [
      {
        text: '列', children: [
          { text: '上方列', icon: 'add', action: new AddRow(this.context, this, 'before') },
          { text: '下方列', icon: 'add', action: new AddRow(this.context, this, 'after') },
          { text: '刪除列', icon: 'delete', action: new DeleteRow(this.context, this) },
        ]
      },
      {
        text: '欄', children: [
          { text: '刪除欄', icon: 'delete', action: new DeleteCol(this.context, this) },
        ]
      },
      {
        text: '合併', action: new Merge(this.context, this),
      },
      {
        text: '分割', children: [
          { text: '水平分割', icon: 'delete', action: new Split(this.context, this, 'horizontal') },
          { text: '垂直分割', icon: 'delete', action: new Split(this.context, this, 'verticle') },
        ]
      },
      {
        text: '刪除表格', action: new DeleteTable(this.context, this),
      },
    ];
    const cols = this.el.querySelectorAll('tr')[0].querySelectorAll('td').length;
    this._tableSetting = { cols };
    this._subscribeEvents();
    this._subscribeCellSelection();
  }

  protected onRemovedFromEditor(): void {
    this._subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this._subscriptions = [];
    this._contextMenuItems = undefined;
    this._unsubscribeCellSelection();
  }

  getSetting(): ITableSetting {
    return this._tableSetting;
  }

  private _subscribeEvents() {
    const selectionchange$ = fromEvent(document, 'selectionchange').subscribe(_ => {
      if (!this.context.isSelectionInsideEditorContainer) { return; }

      const range = this.context.simpleWysiwygService.getRange();

      if (this.el.contains(range?.commonAncestorContainer)) {
        this._onSelected();
      } else {
        this._onUnselected();
      }
    });
    this._subscriptions.push(selectionchange$);
  }


  private _subscribeCellSelection() {
    this._selectCellSubscription?.unsubscribe();

    const evPreventDefaultAndStopPropagation = (source: Observable<MouseEvent>) => new Observable<MouseEvent>(observer => {
      return source.subscribe({
        next: (ev) => {
          this._evPreventDefaultAndStopPropagation(ev);
          observer.next(ev);
        },
        error(err) { observer.error(err) },
        complete() { observer.complete() }
      });
    });

    const table = this.el;
    let startCell: HTMLTableDataCellElement;

    const selectTo = (currentCell: HTMLTableDataCellElement) => {
      const startCellStartEnd = this._tableControllerService.getCellStartEnd(startCell);
      const currentCellStartEnd = this._tableControllerService.getCellStartEnd(currentCell);

      const rowStart = startCellStartEnd.rowStart <= currentCellStartEnd.rowStart ? startCellStartEnd.rowStart : currentCellStartEnd.rowStart;
      const rowEnd = startCellStartEnd.rowEnd >= currentCellStartEnd.rowEnd ? startCellStartEnd.rowEnd : currentCellStartEnd.rowEnd;
      const colStart = startCellStartEnd.colStart <= currentCellStartEnd.colStart ? startCellStartEnd.colStart : currentCellStartEnd.colStart;
      const colEnd = startCellStartEnd.colEnd >= currentCellStartEnd.colEnd ? startCellStartEnd.colEnd : currentCellStartEnd.colEnd;

      const trs = Array.from(this.el.querySelectorAll('tr'));
      for (let i = rowStart; i <= rowEnd; ++i) {
        const row = trs[i];
        const cells = Array.from(row.childNodes) as HTMLTableDataCellElement[];

        cells.forEach((cell, cellIndex) => {
          const cellColStartEnd = this._tableControllerService.getCellStartEnd(cell);
          if (cellColStartEnd.colStart >= colStart && cellColStartEnd.colEnd <= colEnd) {
            cell?.classList.add("selected");
          }
        });
      }
    }

    const removeAllSelected = () => {
      table.querySelectorAll(".selected").forEach(td => {
        td.classList.remove("selected");
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
        // console.warn('start = ', start);
        const cell = this.context.simpleWysiwygService.findTagFromTargetToContainer(this.context.editorContainer, start.target as HTMLElement, 'td') as HTMLTableDataCellElement;
        if (!cell) { return undefined; }
        if (start.button === 2) { return of(undefined); } // right click
        if (!(start.ctrlKey || start.metaKey)) {
          removeAllSelected();
        } // 多選

        if (!cell.classList.contains('selected')) {
          cell.classList.add("selected");
        } else {
          cell.classList.remove("selected");
        }

        if (!(start.shiftKey)) { return of(undefined); } // 拖拉多選
        start.stopPropagation();
        start.preventDefault();

        startCell = cell;

        return mouseover$.pipe(
          tap(over => {
            // console.warn('over = ', over);
            removeAllSelected();
            selectTo(this.context.simpleWysiwygService.findTagFromTargetToContainer(this.context.editorContainer, over.target as HTMLElement, 'td') as HTMLTableDataCellElement);
          }),
          takeUntil(mouseup$.pipe(
            tap(end => {
              // console.warn('end = ', end);
              this.checkTableState();
            })
          ))
        )
      })
    )

    this._selectCellSubscription = drag$.subscribe();
  }

  private _unsubscribeCellSelection() {
    this._selectCellSubscription?.unsubscribe();
    const tds = Array.from(this.el.querySelectorAll('.selected')) as HTMLElement[];
    tds.forEach(td => td.classList.remove('selected'));
    this.checkTableState();
  }

  private _onSelected(): void {
    this.el.style.setProperty('outline', '3px solid #b4d7ff');
    if (!this.selectedCols.length) {
      const range = this.context.simpleWysiwygService.getRange();
      const td = this.context.simpleWysiwygService.findTagFromTargetToContainer(this.context.editorContainer, range.commonAncestorContainer as HTMLElement, 'td') as HTMLTableDataCellElement;
      if (td) {
        td.classList.add('selected');
        this.selectedCols.push(td);
      }
    }
    this.checkTableState();
    this._subscribeCellSelection();
  }

  private _onUnselected(): void {
    this.el.style.removeProperty('outline');
    this._unsubscribeCellSelection();
  }

  private _evPreventDefaultAndStopPropagation = (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
  }

  checkTableState() {
    this.selectedCols = Array.from(this.el.querySelectorAll("td.selected"));
    this.selectedRows = this.selectedCols.map(col => col.parentElement).filter((row, i, arr) => arr.indexOf(row) === i) as HTMLTableRowElement[];

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
  }

}