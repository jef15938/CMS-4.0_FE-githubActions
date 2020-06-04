import { DomCmdAction } from '../action.base';
import { HtmlEditorCreateLinkModalComponent } from '../../modal/html-editor-create-link-modal/html-editor-create-link-modal.component';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

export class CreateLink extends DomCmdAction {
  commandId = 'createLink';

  do() {
    const range = this.context.simpleWysiwygService.getRange();
    const selected = this.context.getSelected();
    const selectedTagName = selected?.tagName?.toLocaleLowerCase();

    if (!range) { return of(undefined); }

    let aTag: HTMLAnchorElement;

    if (selectedTagName === 'a') {
      aTag = selected as HTMLAnchorElement;
    }

    // try to find the parent <a>
    if (!aTag) {
      let parent = selected.parentElement;
      while (parent) {
        if (parent.tagName.toLowerCase() === 'a') {
          aTag = parent as HTMLAnchorElement;
          parent = undefined;
          break;
        }
        parent = parent.parentElement;
      }
    }

    const start = range.startContainer;
    const end = range.endContainer;
    const isSelectionInSameNode = start === end;
    let text = range.toString();

    const url = aTag ? aTag.href : '';
    const isTargetBlank = aTag ? aTag.target === '_blank' : true;
    text = aTag ? aTag.innerText : text;

    return this.context.modalService.openComponent({
      component: HtmlEditorCreateLinkModalComponent,
      componentInitData: {
        url, text, isTargetBlank, isSelectionInSameNode, title: aTag ? '修改連結' : '加入連結'
      }
    }).pipe(
      map((config: { url: string, text: string, isTargetBlank: boolean }) => {
        this.context.simpleWysiwygService.restoreSelection(range);
        if (!config) { return; }

        config.text = config.text || config.url;

        if (aTag) {
          aTag.href = config.url;
          aTag.text = config.text;
          aTag.target = config.isTargetBlank ? '_blank' : '';
        } else {
          aTag = document.createElement('a');
          aTag.href = config.url;
          aTag.target = config.isTargetBlank ? '_blank' : '';
          aTag.appendChild(selected);
          range.insertNode(aTag);
        }
        return true;
      })
    );
  }

}