import { HtmlEditorActionBase } from '../action.base';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HtmlEditorInsertFileModalComponent, FileSource } from '../../modal/html-editor-insert-file-modal/html-editor-insert-file-modal.component';
import { FILE_CLASS_GALLERY_FILE, GALLERY_ATTR_GALLERY_ID, GALLERY_ATTR_GALLERY_NAME, FILE_ATTR_FILE_SOURCE } from '../../const/html-editor-container.const';
import { HtmlEditorActionCategory } from '../action.enum';

export class ModifyFile extends HtmlEditorActionBase {
  category = HtmlEditorActionCategory.FILE;
  do() {
    const range = this.context.simpleWysiwygService.getRange();
    if (!range) { return of(undefined); }

    const existingFileLink = this.getExistingFileLink(range);
    const galleryID = +existingFileLink.getAttribute(GALLERY_ATTR_GALLERY_ID);
    const galleryName = existingFileLink.getAttribute(GALLERY_ATTR_GALLERY_NAME);
    console.warn({ galleryName });

    const fileSource = existingFileLink.getAttribute(FILE_ATTR_FILE_SOURCE) as FileSource || FileSource.NONE;

    return this.context.modalService.openComponent({
      component: HtmlEditorInsertFileModalComponent,
      componentInitData: {
        fileLink: existingFileLink,
        galleryID,
        galleryName,
        fileSource,
      }
    }).pipe(
      tap(_ => this.context.simpleWysiwygService.restoreSelection(range)),
      tap(configATag => {
        if (!configATag) { return; }
        existingFileLink.href = configATag.href;
        existingFileLink.text = configATag.text;
        existingFileLink.target = '_blank';
        if (configATag.galleryID) {
          existingFileLink.setAttribute(GALLERY_ATTR_GALLERY_ID, `${configATag.galleryID}`);
          existingFileLink.setAttribute(GALLERY_ATTR_GALLERY_NAME, `${configATag.galleryName || ''}`);
          existingFileLink.setAttribute(FILE_ATTR_FILE_SOURCE, `${configATag.fileSource || ''}`);
        }
      }),
    );

  }

  private getExistingFileLink(range: Range): HTMLAnchorElement {
    const selectedTarget = this.context.selectedTarget as HTMLElement;
    const selectedTargetTagName = selectedTarget?.tagName?.toLocaleLowerCase();
    let aTag: HTMLAnchorElement;

    if (selectedTargetTagName === 'a') {
      aTag = selectedTarget as HTMLAnchorElement;
    } else {
      // try to find the parent <a>
      if (!aTag) {
        let parent = selectedTarget.parentElement;
        let a: HTMLAnchorElement;
        while (parent) {
          if (parent === this.context.editorContainer) {
            parent = undefined;
            break;
          }
          if (parent.tagName.toLowerCase() === 'a') {
            a = parent as HTMLAnchorElement;
            parent = undefined;
            break;
          }
          parent = parent.parentElement;
        }
        aTag = a || undefined;
      }
    }

    return aTag?.classList?.contains(FILE_CLASS_GALLERY_FILE) ? aTag : undefined;
  }

}
