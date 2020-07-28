import { DomCmdAction } from '../action.base';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HtmlEditorCreateLinkModalComponent } from '../../modal/html-editor-create-link-modal/html-editor-create-link-modal.component';

const CLASS_NAME_EDITOR_LINK = 'editor-link';

export class CreateLink extends DomCmdAction {
  commandId = 'createLink';

  do() {
    const range = this.context.simpleWysiwygService.getRange();
    if (!range) { return of(undefined); }

    const existingATag = this.getExistingATag(range);
    const isCreate = !existingATag;
    const canModifyText = this.canModifyText(range);
    const aTagToModify = isCreate ? document.createElement('a') : existingATag;

    if (isCreate && canModifyText) {
      aTagToModify.text = range.toString();
    }

    return this.context.modalService.openComponent({
      component: HtmlEditorCreateLinkModalComponent,
      componentInitData: {
        title: `${isCreate ? '加入' : '修改'}連結`,
        aTag: aTagToModify,
        canModifyText
      }
    }).pipe(
      tap((configATag: HTMLAnchorElement) => {
        this.context.simpleWysiwygService.restoreSelection(range);
        if (!configATag) { return; }

        aTagToModify.href = configATag.href;
        aTagToModify.target = configATag.target;

        if (isCreate) { // 新增
          const editorContainerCommonAncestorContainer = this.context.commonAncestorContainer as HTMLElement;
          const isCreateOnImg = editorContainerCommonAncestorContainer.tagName?.toLowerCase() === 'img'
            && !editorContainerCommonAncestorContainer.getAttribute('frameId');

          if (isCreateOnImg) {
            aTagToModify.appendChild(editorContainerCommonAncestorContainer);
          } else {
            if (canModifyText) {
              aTagToModify.text = configATag.text || configATag.href;
            } else {
              const contents = range.cloneContents();
              aTagToModify.appendChild(contents);
            }
          }
          aTagToModify.classList.add(CLASS_NAME_EDITOR_LINK);
          const modified = this.context.simpleWysiwygService.insertHtml(aTagToModify.outerHTML);

          this.context.simpleWysiwygService.setSelectionOnNode(
            isCreateOnImg ? modified.getElementsByTagName('img')[0] : modified,
            0,
            isCreateOnImg ? 0 : modified.childNodes?.length);
        }
      })
    );
  }

  private canModifyText(range: Range): boolean {
    const commonAncestorContainer = this.context.commonAncestorContainer as HTMLElement;
    const commonAncestorContainerTagName = commonAncestorContainer?.tagName?.toLocaleLowerCase();

    if (commonAncestorContainerTagName === 'img' && !commonAncestorContainer.getAttribute('frameId')) { return false; }
    if (range.collapsed) { return true; }
    return true;
  }

  private getExistingATag(range: Range): HTMLAnchorElement {
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

    return aTag && aTag.classList.contains(CLASS_NAME_EDITOR_LINK) ? aTag : undefined;
  }

}
