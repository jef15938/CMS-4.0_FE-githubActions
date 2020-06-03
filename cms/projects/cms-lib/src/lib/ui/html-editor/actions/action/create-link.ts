import { DomCmdAction } from '../action.base';
import { HtmlEditorCreateLinkModalComponent } from '../../modal/html-editor-create-link-modal/html-editor-create-link-modal.component';

export class CreateLink extends DomCmdAction {
  commandId = 'createLink';

  do() {
    const range = this.context.selecitonRangeService.getRange();
    if (!range) { return; }

    const start = range.startContainer;
    const end = range.endContainer;
    const isSelectionInSameNode = start === end;
    let text = range.toString();

    const parent = isSelectionInSameNode ? start.parentElement : undefined;
    const aTag = (parent?.tagName?.toLowerCase() === 'a' ? parent : undefined) as HTMLAnchorElement;
    const url = aTag ? aTag.href : '';
    const isTargetBlank = aTag ? aTag.target === '_blank' : true;
    text = aTag ? aTag.innerText : text;

    this.context.modalService.openComponent({
      component: HtmlEditorCreateLinkModalComponent,
      componentInitData: {
        url, text, isTargetBlank, isSelectionInSameNode, title: aTag ? '修改連結' : '加入連結'
      }
    }).subscribe((config: { url: string, text: string, isTargetBlank: boolean }) => {
      this.context.selecitonRangeService.restoreRange(range);
      if (!config) { return; }

      config.text = config.text || config.url;

      if (aTag) {
        aTag.href = config.url;
        aTag.text = config.text;
        aTag.target = config.isTargetBlank ? '_blank' : '';
      } else {
        // https://stackoverflow.com/questions/23811132/adding-a-target-blank-with-execcommand-createlink
        try {
          document.execCommand('insertHTML', false, `<a href=${config.url} target=${config.isTargetBlank ? '_blank' : ''}>${config.text}</a>`)
        } catch (createLinkError) {
          console.error('CreateLink createLinkError = ', createLinkError);
          try {
            const node = document.createElement('a');
            node.href = config.url;
            node.text = config.text;
            node.target = config.isTargetBlank ? '_blank' : '';
            range.insertNode(node);
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
    });
  }
}