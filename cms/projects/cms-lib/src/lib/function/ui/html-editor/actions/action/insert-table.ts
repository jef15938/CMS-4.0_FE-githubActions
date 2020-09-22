import { HtmlEditorActionBase } from '../action.base';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HtmlEditorInsertTableModalComponent } from '../../modal/html-editor-insert-table-modal/html-editor-insert-table-modal.component';
import { TableControllerService } from '../../service/html-element-controller/table/table-controller-service';
import { HtmlEditorContext } from '../../html-editor.interface';

export class InsertTable extends HtmlEditorActionBase {

  private tableControllerService: TableControllerService;

  constructor(
    context: HtmlEditorContext,
  ) {
    super(context);
    this.tableControllerService = new TableControllerService();
  }

  do() {
    const range = this.context.simpleWysiwygService.getRange();
    if (!range) { return of(undefined); }

    const existingTable = this.context.simpleWysiwygService.findTagFromTargetToContainer(
      this.context.editorContainer,
      range.commonAncestorContainer as HTMLElement, 'table'
    );

    if (existingTable) {
      return this.context.modalService.openMessage({
        message: '表格內無法插入表格',
        title: '插入表格錯誤'
      });
    }

    return this.context.modalService.openComponent({
      component: HtmlEditorInsertTableModalComponent,
    }).pipe(
      tap(config => {
        this.context.simpleWysiwygService.restoreSelection(range);
        if (!config) { return; }
        const table = this.tableControllerService.createTable(config);
        const addedTable = this.context.simpleWysiwygService.insertHtml(table.outerHTML, this.context.editorContainer) as HTMLTableElement;
        this.context.simpleWysiwygService.setSelectionOnNode(addedTable);
      })
    );
  }

  private findExistingTable(): HTMLTableElement {
    const range = this.context.simpleWysiwygService.getRange();
    const selectedTarget = range.commonAncestorContainer as HTMLElement;
    const selectedTargetTagName = selectedTarget?.tagName?.toLowerCase();
    const tableTagNames = ['td', 'th', 'tr', 'table', 'tbody', 'thead', 'tfoot'];
    if (selectedTarget && tableTagNames.indexOf(selectedTargetTagName) > -1) {
      let el = selectedTarget;
      while (el) {
        const tagName = el.tagName?.toLowerCase();
        if (tagName === 'table') {
          break;
        } else {
          el = el.parentElement;
        }
      }
      return el as HTMLTableElement;
    }
    return null;
  }
}
