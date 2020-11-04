import { DomCmdAction } from '../action.base';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HtmlEditorCreateLinkModalComponent } from '../../modal/html-editor-create-link-modal/html-editor-create-link-modal.component';
import { VIDEO_ATTR_FRAME_ID, LINK_CLASS_EDITOR_LINK, FILE_CLASS_GALLERY_FILE } from '../../const/html-editor-container.const';
import { HtmlEditorActionCategory } from '../action.enum';

export class CreateLink extends DomCmdAction {
  category = HtmlEditorActionCategory.LINK;
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

    const isGallery = existingATag?.classList?.contains(FILE_CLASS_GALLERY_FILE);

    return this.context.modalService.openComponent({
      component: HtmlEditorCreateLinkModalComponent,
      componentInitData: {
        title: `${isCreate ? '加入' : '修改'}連結`,
        aTag: aTagToModify,
        canModifyText,
        isGallery,
      }
    }).pipe(
      tap(atagConfig => {
        this.context.simpleWysiwygService.restoreSelection(range);
        if (!atagConfig) { return; }

        aTagToModify.href = atagConfig.href;
        aTagToModify.target = atagConfig.target;

        if (canModifyText) {
          aTagToModify.text = atagConfig.text;
        }
        if (!isGallery) {
          aTagToModify.setAttribute('urlType', atagConfig.urlType);
          aTagToModify.setAttribute('siteId', atagConfig.siteId);
          aTagToModify.setAttribute('actionID', atagConfig.actionID)
        }

        if (isCreate) { // 新增
          const editorContainerSelectedTarget = this.context.selectedTarget as HTMLElement;
          const isCreateOnImg = editorContainerSelectedTarget.tagName?.toLowerCase() === 'img'
            && !editorContainerSelectedTarget.getAttribute(VIDEO_ATTR_FRAME_ID);

          if (isCreateOnImg) {
            aTagToModify.appendChild(editorContainerSelectedTarget);
          } else {
            if (canModifyText) {
              aTagToModify.text = atagConfig.text || atagConfig.href;
            } else {
              const contents = range.cloneContents();
              aTagToModify.appendChild(contents);
            }
          }
          aTagToModify.classList.add(LINK_CLASS_EDITOR_LINK);
          const modified = this.context.simpleWysiwygService.insertHtml(aTagToModify.outerHTML, this.context.editorContainer);

          this.context.simpleWysiwygService.setSelectionOnNode(
            isCreateOnImg ? modified.getElementsByTagName('img')[0] : modified,
            0,
            isCreateOnImg ? 0 : modified.childNodes?.length);
        }
      })
    );
  }

  private canModifyText(range: Range): boolean {
    const selectedTarget = this.context.selectedTarget as HTMLElement;
    const selectedTargetTagName = selectedTarget?.tagName?.toLocaleLowerCase();

    if (selectedTargetTagName === 'img' && !selectedTarget.getAttribute(VIDEO_ATTR_FRAME_ID)) { return false; }
    if (range.collapsed) { return true; }
    return true;
  }

  private getExistingATag(range: Range): HTMLAnchorElement {
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

    return aTag;
  }

}
