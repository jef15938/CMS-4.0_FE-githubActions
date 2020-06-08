import { HtmlEditorElementController } from './../_base';
import { fromEvent, Subscription, merge, Observable } from 'rxjs';
import { IHtmlEditorContextMenuItem } from '../../../html-editor.interface';
import { DeleteRow } from './actions/delete-row';
import { AddRow } from './actions/add-row';
import { ITableController, ITableSetting } from './table-controller.interface';
import { DeleteCol } from './actions/delete-col';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

export class HtmlEditorTableController extends HtmlEditorElementController<HTMLTableElement> implements ITableController {

  contextMenuItems: IHtmlEditorContextMenuItem[];

  private _tableSetting: ITableSetting;
  private _subscriptions: Subscription[] = [];

  private _selectCellSubscription: Subscription;

  getSetting(): ITableSetting {
    return this._tableSetting;
  }

  private _evPreventDefaultAndStopPropagation = (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
  }

  private _subscribeCellSelection() {
    console.warn(1);
    try {
      this._selectCellSubscription?.unsubscribe();
    } catch (error) {

    }

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
        var rowCells = table.querySelectorAll("tr")[i].querySelectorAll("td");
        for (var j = cellStart; j <= cellEnd; j++) {
          rowCells[j].classList.add("selected");
        }
      }
    }

    const getSelectedCells = () => {
      table.querySelectorAll("td").forEach(td => {
        // if ($(this).hasClass('selected')) {
        //   var col = $(this).parent().children().index($(this));
        //   var row = $(this).parent().parent().children().index($(this).parent());
        //   console.log('Row: ' + row + ', Column: ' + col);
        // }
      });
    }

    const removeAllSelected = () => {
      table.querySelectorAll(".selected").forEach(td => {
        td.classList.remove("selected");
      });
    };

    const tds = table.querySelectorAll('td');

    const mousedown$: Observable<MouseEvent> = merge(
      ...Array.from(tds).map(td => fromEvent(td, 'mousedown'))
    ).pipe(evPreventDefaultAndStopPropagation);

    const mouseover$: Observable<MouseEvent> = merge(
      ...Array.from(tds).map(td => fromEvent(td, 'mouseover'))
    ).pipe(evPreventDefaultAndStopPropagation);

    const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup').pipe(evPreventDefaultAndStopPropagation);

    let disableDocumentMoveEvent: Subscription;

    const drag$ = mousedown$.pipe(
      tap(_ => {
        disableDocumentMoveEvent = fromEvent<MouseEvent>(document, 'mousemove').pipe(evPreventDefaultAndStopPropagation).subscribe();
      }),
      switchMap(start => {
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
              getSelectedCells();
            })
          ))
        )
      })
    )

    this._selectCellSubscription = drag$.subscribe();
  }

  protected onAddToEditor(): void {
    this.contextMenuItems = [
      { text: '上方列', icon: 'add', action: new AddRow(this.context, this, 'before') },
      { text: '下方列', icon: 'add', action: new AddRow(this.context, this, 'after') },
      { text: '刪除列', icon: 'delete', action: new DeleteRow(this.context, this) },
      { text: '刪除欄', icon: 'delete', action: new DeleteCol(this.context, this) },
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
    this.contextMenuItems = undefined;
    this._selectCellSubscription?.unsubscribe();
  }

  private _subscribeEvents() {
    const selectionchange$ = fromEvent(document, 'selectionchange').subscribe(_ => {
      if (!this.context.isSelectionInsideEditorContainer) { return; }

      const range = this.context.simpleWysiwygService.getRange();

      if (this.el.contains(range?.startContainer)) {
        this._onSelected();
      } else {
        this._onUnselected();
      }
    });
    this._subscriptions.push(selectionchange$);
  }

  private _onSelected(): void {
    this.el.style.setProperty('outline', '3px solid #b4d7ff');
    this._subscribeCellSelection();
  }

  private _onUnselected(): void {
    this.el.style.removeProperty('outline');

    const tds = Array.from(this.el.querySelectorAll('.selected'));
    tds.forEach(td => {
      (td as HTMLElement).classList.remove('.selected');
    })
  }

}