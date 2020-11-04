import { HtmlEditorActionBase } from '../action.base';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HtmlEditorInsertFileModalComponent } from '../../modal/html-editor-insert-file-modal/html-editor-insert-file-modal.component';
import { FILE_CLASS_GALLERY_FILE, GALLERY_ATTR_GALLERY_ID, GALLERY_ATTR_GALLERY_NAME, FILE_ATTR_FILE_SOURCE } from '../../const/html-editor-container.const';
import { HtmlEditorActionCategory } from '../action.enum';

export class InsertFile extends HtmlEditorActionBase {
  category = HtmlEditorActionCategory.FILE;
  do() {
    const range = this.context.simpleWysiwygService.getRange();
    if (!range) { return of(undefined); }

    return this.context.modalService.openComponent({
      component: HtmlEditorInsertFileModalComponent,
    }).pipe(
      tap(_ => this.context.simpleWysiwygService.restoreSelection(range)),
      tap(configATag => {
        if (!configATag) { return; }
        const aTag = document.createElement('a');
        aTag.href = configATag.href;
        aTag.text = configATag.text;
        aTag.target = '_blank';
        aTag.classList.add(FILE_CLASS_GALLERY_FILE);
        if (configATag.galleryID) {
          aTag.setAttribute(GALLERY_ATTR_GALLERY_ID, `${configATag.galleryID}`);
          aTag.setAttribute(GALLERY_ATTR_GALLERY_NAME, `${configATag.galleryName || ''}`);
          aTag.setAttribute(FILE_ATTR_FILE_SOURCE, `${configATag.fileSource || ''}`);
        }
        const inserted = this.context.simpleWysiwygService.insertHtml(aTag.outerHTML, this.context.editorContainer);
      }),
    );

  }

}
