import { HtmlEditorElementController } from './../_base';
import { fromEvent, Subscription, merge, Observable, of, concat } from 'rxjs';
import { IHtmlEditorContextMenuItem } from '../../../html-editor.interface';
import { DeleteRow } from './actions/delete-row';
import { AddRow } from './actions/add-row';
import { ITableController, ITableSetting } from './table-controller.interface';
import { DeleteCol } from './actions/delete-col';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

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
    }, 100)

    return menuItems;
  };

  selectedCols: HTMLTableDataCellElement[] = [];
  selectedRows: HTMLTableRowElement[] = [];

  private _tableSetting: ITableSetting;
  private _subscriptions: Subscription[] = [];

  private _selectCellSubscription: Subscription;

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
        text: '合併', action: new DeleteCol(this.context, this),
      },
      {
        text: '分割', children: [
          { text: '刪除欄', icon: 'delete', action: new DeleteCol(this.context, this) },
        ]
      },
      {
        text: '刪除表格', action: new DeleteCol(this.context, this),
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
    let startRowIndex = null;
    let startCellIndex = null;

    const selectTo = (cell) => {
      var row = cell.parentNode as HTMLElement;
      var cellIndex = (Array.from(row.childNodes) as HTMLElement[]).indexOf(cell);
      var rowIndex = (Array.from(row.parentNode.childNodes) as HTMLElement[]).indexOf(row);

      var rowStart, rowEnd, cellStart, cellEnd;

      if (rowIndex < startRowIndex) {
        rowStart = rowIndex;
        rowEnd = startRowIndex;
      } else {
        rowStart = startRowIndex;
        rowEnd = rowIndex;
      }

      if (cellIndex < startCellIndex) {
        cellStart = cellIndex;
        cellEnd = startCellIndex;
      } else {
        cellStart = startCellIndex;
        cellEnd = cellIndex;
      }

      for (var i = rowStart; i <= rowEnd; i++) {
        const trs = table.querySelectorAll("tr");
        const row = trs[i];
        var rowCells = row.querySelectorAll("td");
        for (var j = cellStart; j <= cellEnd; j++) {
          const cell = rowCells[j];
          cell?.classList.add("selected");
        }
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
    ).pipe(evPreventDefaultAndStopPropagation);

    const mouseover$: Observable<MouseEvent> = merge(
      ...tds.map(td => fromEvent(td, 'mouseover'))
    ).pipe(evPreventDefaultAndStopPropagation);

    const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup').pipe(evPreventDefaultAndStopPropagation);

    let disableDocumentMoveEvent: Subscription;

    const drag$ = mousedown$.pipe(
      tap(_ => {
        disableDocumentMoveEvent = fromEvent<MouseEvent>(document, 'mousemove').pipe(evPreventDefaultAndStopPropagation).subscribe();
      }),
      switchMap(start => {
        if (start.button === 2) { return of(undefined); } // right click

        // console.warn('start = ', start);
        removeAllSelected();

        let cell = event.target as HTMLElement;
        if (cell.tagName?.toLowerCase() === 'div') { cell = cell.parentNode as HTMLElement }
        cell.classList.add("selected");
        const row = cell.parentNode as HTMLElement;
        startCellIndex = Array.from(row.childNodes).indexOf(cell);
        startRowIndex = (Array.from(row.parentNode.childNodes) as HTMLElement[]).indexOf(row);
        return mouseover$.pipe(
          tap(over => {
            // console.warn('over = ', over);
            removeAllSelected();
            selectTo(over.target);
          }),
          takeUntil(mouseup$.pipe(
            tap(end => {
              // console.warn('end = ', end);
              disableDocumentMoveEvent?.unsubscribe();
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