import { HtmlEditorActionBase } from '../action.base';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HtmlEditorInsertFileModalComponent } from '../../modal/html-editor-insert-file-modal/html-editor-insert-file-modal.component';

const CLASS_NAME_GALLERY_FILE = 'gallery-file';

export class ModifyFile extends HtmlEditorActionBase {

  do() {
    const range = this.context.simpleWysiwygService.getRange();
    if (!range) { return of(undefined); }

    const existingFileLink = this.getExistingFileLink(range);

    return this.context.modalService.openComponent({
      component: HtmlEditorInsertFileModalComponent,
      componentInitData: { fileLink: existingFileLink }
    }).pipe(
      tap(_ => this.context.simpleWysiwygService.restoreSelection(range)),
      tap((configATag: HTMLAnchorElement) => {
        if (!configATag) { return; }
        existingFileLink.href = configATag.href;
        existingFileLink.text = configATag.text;
        existingFileLink.target = '_blank';
      }),
    );

  }

  private getExistingFileLink(range: Range): HTMLAnchorElement {
    const commonAncestorContainer = this.context.commonAncestorContainer as HTMLElement;
    const commonAncestorContainerTagName = commonAncestorContainer?.tagName?.toLocaleLowerCase();
    let aTag: HTMLAnchorElement;

    if (commonAncestorContainerTagName === 'a') {
      aTag = commonAncestorContainer as HTMLAnchorElement;
    } else {
      // try to find the parent <a>
      if (!aTag) {
        let parent = commonAncestorContainer.parentElement;
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
