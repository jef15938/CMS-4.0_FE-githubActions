import { HtmlEditorActionBase } from '../action.base';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HtmlEditorInsertFileModalComponent } from '../../modal/html-editor-insert-file-modal/html-editor-insert-file-modal.component';

const CLASS_NAME_GALLERY_FILE = 'gallery-file';

export class InsertFile extends HtmlEditorActionBase {

  do() {
    const range = this.context.simpleWysiwygService.getRange();
    if (!range) { return of(undefined); }

    return this.context.modalService.openComponent({
      component: HtmlEditorInsertFileModalComponent,
    }).pipe(
      tap(_ => this.context.simpleWysiwygService.restoreSelection(range)),
      tap((configATag: HTMLAnchorElement) => {
        if (!configATag) { return; }
        const aTag = document.createElement('a');
        aTag.href = configATag.href;
        aTag.text = configATag.text;
        aTag.target = '_blank';
        aTag.classList.add(CLASS_NAME_GALLERY_FILE);

        const inserted = this.context.simpleWysiwygService.insertHtml(aTag.outerHTML);
      }),
    );

  }

}
