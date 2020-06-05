import { DomCmdAction } from '../action.base';
import { HtmlEditorCreateLinkModalComponent } from '../../modal/html-editor-create-link-modal/html-editor-create-link-modal.component';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

export class CreateLink extends DomCmdAction {
  commandId = 'createLink';

  do() {
    const range = this.context.simpleWysiwygService.getRange();
    if (!range) { return of(undefined); }

    const existingATag = this._getExistingATag(range);
    // console.warn('existingATag = ', existingATag);
    const isCreate = !existingATag;
    // console.warn('isCreate = ', isCreate);
    const canModifyText = this._canModifyText(range);
    // console.warn('canModifyText = ', canModifyText);
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
      tap((configATag: HTMLAnchorElement, ) => {
        this.context.simpleWysiwygService.restoreSelection(range);
        if (!configATag) { return; }

        aTagToModify.href = configATag.href;
        aTagToModify.target = configATag.target;


        if (isCreate) { // 新增
          if ((range.commonAncestorContainer as HTMLElement).tagName?.toLowerCase() === 'img') {
            aTagToModify.appendChild(range.commonAncestorContainer);
            range.insertNode(aTagToModify);
            this.context.simpleWysiwygService.setSelectionOnNode(aTagToModify, 0, 1);
          } else {
            const rangeStart = 0;
            let rangeEnd = 1;
            if (canModifyText) {
              aTagToModify.text = configATag.text || configATag.href;
            } else {
              const extractContents = range.extractContents();
              aTagToModify.appendChild(extractContents);
              rangeEnd = aTagToModify.childNodes.length;
            }
            range.deleteContents();
            range.insertNode(aTagToModify);
            this.context.simpleWysiwygService.setSelectionOnNode(aTagToModify, rangeStart, rangeEnd);
          }
        }
      })
    );
  }

  private _canModifyText(range: Range): boolean {
    const commonAncestorContainer = this.context.commonAncestorContainer as HTMLElement;
    const commonAncestorContainerTagName = commonAncestorContainer?.tagName?.toLocaleLowerCase();

    if (commonAncestorContainerTagName === 'img') { return false; }
    if (range.collapsed) { return true; }

    let canModifyText = true;
    let nodesToCheck: Node[] = [];
    if (range.startContainer === range.endContainer) {
      nodesToCheck.push(range.startContainer);
    } else {
      const children = Array.from(range.commonAncestorContainer.childNodes);

      let start = children.indexOf(range.startContainer as HTMLElement);

      let startTarget = range.startContainer;
      while (start < 0) {
        start = children.indexOf(startTarget.parentElement);
        startTarget = startTarget.parentElement;
      }

      let end = children.indexOf(range.endContainer as HTMLElement);
      let endTarget = range.endContainer;
      while (end < 0) {
        end = children.indexOf(endTarget.parentElement);
        endTarget = endTarget.parentElement;
      }
      end += 1;

      nodesToCheck = children.slice(start, end);
    }

    while (nodesToCheck.length) {
      if (
        nodesToCheck.some(n => {
          const tagName = (n as HTMLElement).tagName?.toLowerCase();
          return tagName === 'img';
        })
      ) {
        canModifyText = false;
        break;
      }
      nodesToCheck = nodesToCheck.reduce((a, b) => {
        return a.concat(Array.from(b.childNodes))
      }, [] as Node[]);
    };

    return canModifyText;
  }

  private _getExistingATag(range: Range): HTMLAnchorElement {
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

    return aTag;
  }

}