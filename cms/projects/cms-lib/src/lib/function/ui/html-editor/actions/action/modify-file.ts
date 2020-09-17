import { HtmlEditorActionBase } from '../action.base';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HtmlEditorInsertFileModalComponent } from '../../modal/html-editor-insert-file-modal/html-editor-insert-file-modal.component';
import { CLASS_NAME_GALLERY_FILE, ATTRIBUTE_GALLERY_ID, ATTRIBUTE_GALLERY_NAME } from '../../const/html-editor-container.const';

export class ModifyFile extends HtmlEditorActionBase {

  do() {
    const range = this.context.simpleWysiwygService.getRange();
    if (!range) { return of(undefined); }

    const existingFileLink = this.getExistingFileLink(range);
    const galleryID = +existingFileLink.getAttribute(ATTRIBUTE_GALLERY_ID);
    const galleryName = existingFileLink.getAttribute(ATTRIBUTE_GALLERY_NAME);

    return this.context.modalService.openComponent({
      component: HtmlEditorInsertFileModalComponent,
      componentInitData: {
        fileLink: existingFileLink,
        galleryID,
        galleryName,
      }
    }).pipe(
      tap(_ => this.context.simpleWysiwygService.restoreSelection(range)),
      tap((configATag: { href: string; text: string; galleryID: number; galleryName: string }) => {
        if (!configATag) { return; }
        existingFileLink.href = configATag.href;
        existingFileLink.text = configATag.text;
        existingFileLink.target = '_blank';
        if (configATag.galleryID) {
          existingFileLink.setAttribute(ATTRIBUTE_GALLERY_ID, `${configATag.galleryID}`);
          existingFileLink.setAttribute(ATTRIBUTE_GALLERY_NAME, `${configATag.galleryName || ''}`);
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

    return aTag?.classList?.contains(CLASS_NAME_GALLERY_FILE) ? aTag : undefined;
  }

}
