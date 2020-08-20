import { HtmlEditorActionBase } from '../action.base';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HtmlEditorInsertFileModalComponent } from '../../modal/html-editor-insert-file-modal/html-editor-insert-file-modal.component';
import { CLASS_NAME_GALLERY_FILE, ATTRIBUTE_GALLERY_ID } from '../../const/html-editor-container.const';

export class InsertFile extends HtmlEditorActionBase {

  do() {
    const range = this.context.simpleWysiwygService.getRange();
    if (!range) { return of(undefined); }

    return this.context.modalService.openComponent({
      component: HtmlEditorInsertFileModalComponent,
    }).pipe(
      tap(_ => this.context.simpleWysiwygService.restoreSelection(range)),
      tap((configATag: { href: string; text: string; galleyID: number; }) => {
        if (!configATag) { return; }
        const aTag = document.createElement('a');
        aTag.href = configATag.href;
        aTag.text = configATag.text;
        aTag.target = '_blank';
        aTag.classList.add(CLASS_NAME_GALLERY_FILE);
        if (configATag.galleyID) {
          aTag.setAttribute(ATTRIBUTE_GALLERY_ID, `${configATag.galleyID}`);
        }
        const inserted = this.context.simpleWysiwygService.insertHtml(aTag.outerHTML, this.context.editorContainer);
      }),
    );

  }

}
