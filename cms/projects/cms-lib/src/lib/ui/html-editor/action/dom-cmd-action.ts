import { Injectable } from '@angular/core';
import { HtmlEditorAction } from "./action.base";
import { ModalService } from '../../modal/modal.service';
import { HtmlEditorCreateLinkModalComponent } from '../modal/html-editor-create-link-modal/html-editor-create-link-modal.component';
import { stringify } from 'querystring';
import { HtmlEditorInsertImgModalComponent } from '../modal/html-editor-insert-img-modal/html-editor-insert-img-modal.component';

abstract class DomCmdAction extends HtmlEditorAction {
  abstract commandId: string;

  do(editorBlock: HTMLDivElement, ...args): void {
    document.execCommand(this.commandId);
  }
}

@Injectable({ providedIn: 'root' })
export class Bold extends DomCmdAction {
  commandId = 'bold';
}

@Injectable({ providedIn: 'root' })
export class Italic extends DomCmdAction {
  commandId = 'italic';
}

@Injectable({ providedIn: 'root' })
export class Underline extends DomCmdAction {
  commandId = 'underline';
}

@Injectable({ providedIn: 'root' })
export class JustifyCenter extends DomCmdAction {
  commandId = 'justifyCenter';
}

@Injectable({ providedIn: 'root' })
export class JustifyFull extends DomCmdAction {
  commandId = 'justifyFull';
}

@Injectable({ providedIn: 'root' })
export class JustifyLeft extends DomCmdAction {
  commandId = 'justifyLeft';
}

@Injectable({ providedIn: 'root' })
export class JustifyRight extends DomCmdAction {
  commandId = 'justifyRight';
}

@Injectable({ providedIn: 'root' })
export class InsertOrderedList extends DomCmdAction {
  commandId = 'insertOrderedList';
}

@Injectable({ providedIn: 'root' })
export class InsertUnorderedList extends DomCmdAction {
  commandId = 'insertUnorderedList';
}

@Injectable({ providedIn: 'root' })
export class Indent extends DomCmdAction {
  commandId = 'indent';
}

@Injectable({ providedIn: 'root' })
export class Outdent extends DomCmdAction {
  commandId = 'outdent';
}

@Injectable({ providedIn: 'root' })
export class InsertImage extends DomCmdAction {
  commandId = 'insertImage';

  do(editorBlock: HTMLDivElement, image?: HTMLImageElement) {
    const range = this.selecitonRangeService.getRange();
    if (!range) { return; }

    this.modalService.openComponent({
      component: HtmlEditorInsertImgModalComponent,
      componentInitData: {
        title: `${image ? '修改' : '加入'}圖片`,
        src: image?.src || '',
        alt: image?.alt || '',
        width: image?.width || null,
        height: image?.height || null,
      }
    }).subscribe((config: { src: string, alt: string, width: number, height: number }) => {
      this.selecitonRangeService.restoreRange(range);
      if (!config) { return; }

      if (!image) {
        const container = range.commonAncestorContainer.parentElement;
        const img = document.createElement('img');
        img.src = config.src;
        img.alt = config.alt || '';
        img.width = config.width;
        img.height = config.height;
        container.appendChild(img);
        // document.execCommand(this.commandId, false, 'https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201810272230');
      } else {
        image.src = config.src;
        image.alt = config.alt || '';
        image.width = config.width;
        image.height = config.height;
      }

    });
  }
}

@Injectable({ providedIn: 'root' })
export class CreateLink extends DomCmdAction {
  commandId = 'createLink';

  do() {
    const range = this.selecitonRangeService.getRange();
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

    this.modalService.openComponent({
      component: HtmlEditorCreateLinkModalComponent,
      componentInitData: {
        url, text, isTargetBlank, isSelectionInSameNode, title: aTag ? '修改連結' : '加入連結'
      }
    }).subscribe((config: { url: string, text: string, isTargetBlank: boolean }) => {
      this.selecitonRangeService.restoreRange(range);
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