import { DomCmdAction } from '../action.base';
import { HtmlEditorCreateLinkModalComponent } from '../../modal/html-editor-create-link-modal/html-editor-create-link-modal.component';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

export class CreateLink extends DomCmdAction {
  commandId = 'createLink';

  do() {
    const range = this.context.selecitonRangeService.getRange();
    const selected = this.context.getSelected();
    const selectedTagName = selected?.tagName?.toLocaleLowerCase();

    if (!range) { return of(undefined); }

    let aTag: HTMLAnchorElement;

    if (selectedTagName === 'a') {
      aTag = selected as HTMLAnchorElement;
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
      tap((config: { url: string, text: string, isTargetBlank: boolean }) => {
        this.context.selecitonRangeService.restoreRange(range);
        if (!config) { return; }

        config.text = config.text || config.url;

        if (aTag) {
          aTag.href = config.url;
          aTag.text = config.text;
          aTag.target = config.isTargetBlank ? '_blank' : '';
        } else {
          aTag = document.createElement('a');

          if (selectedTagName === 'img') {
            const parent = selected.parentNode;
            aTag.href = config.url;
            aTag.target = config.isTargetBlank ? '_blank' : '';
            parent.appendChild(aTag);
            aTag.appendChild(selected);
            return;
          }
          
          // https://stackoverflow.com/questions/23811132/adding-a-target-blank-with-execcommand-createlink
          try {
            document.execCommand('insertHTML', false, `<a href=${config.url} target=${config.isTargetBlank ? '_blank' : ''}>${config.text}</a>`)
          } catch (createLinkError) {
            console.error('CreateLink createLinkError = ', createLinkError);
            try {
              aTag = document.createElement('a');
              aTag.href = config.url;
              aTag.text = config.text;
              aTag.target = config.isTargetBlank ? '_blank' : '';
              range.insertNode(aTag);
            } catch (insertNodeError) {
              console.error('CreateLink insertNodeError = ', insertNodeError);
            }
          }
          // if (isSelectionInSameNode) {
          //   document.execCommand(this.commandId, false, config.url);
          // } else {
          //   document.execCommand(this.commandId, false, config.url);
          // }
        }
      })
    );
  }

}