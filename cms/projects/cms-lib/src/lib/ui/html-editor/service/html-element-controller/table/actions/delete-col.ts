import { HtmlEditorAction } from '../../../../actions/action.base';
import { Observable, of } from 'rxjs';
import { IHtmlEditorContext } from '../../../../html-editor.interface';
import { ITableController } from '../table-controller.interface';

export class DeleteCol extends HtmlEditorAction {

  constructor(
    context: IHtmlEditorContext,
    private _controller: ITableController,
  ) {
    super(context);
  }

  do(): Observable<any> {
    const table = this._controller.el;
    const range = this.context.simpleWysiwygService.getRange();
    const deletedCol = this.context.simpleWysiwygService.findTagFromTargetToContainer(
      table,
      range.commonAncestorContainer as HTMLElement,
      'td'
    ) as HTMLTableDataCellElement;
    if (deletedCol) {

      const row = deletedCol.parentNode as HTMLTableRowElement;
      const adjustCol = (deletedCol.previousSibling || deletedCol.nextSibling) as HTMLTableDataCellElement;

      if (adjustCol) {
        adjustCol.colSpan += deletedCol.colSpan;
        const deletedColwidth = +(deletedCol.style.getPropertyValue('width')?.replace('px', ''));
        const adjustColWidth = +(adjustCol.style.getPropertyValue('width')?.replace('px', ''));
        adjustCol.setAttribute('style', `width: ${adjustColWidth + deletedColwidth}px`)
      }

      row.removeChild(deletedCol);
      if (!adjustCol) {
        row.parentNode.removeChild(row);
      }

      if (!table.querySelectorAll('tr').length) {
        table.parentNode.removeChild(table);
      }
      this.context.simpleWysiwygService.setSelectionOnNode(table);
    }
    return of(undefined);
  }
}