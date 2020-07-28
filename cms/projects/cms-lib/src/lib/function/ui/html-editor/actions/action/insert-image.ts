import { HtmlEditorActionBase } from '../action.base';
import { tap } from 'rxjs/operators';
import { HtmlEditorInsertImgModalComponent } from '../../modal/html-editor-insert-img-modal/html-editor-insert-img-modal.component';

export interface InsertImageConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export class InsertImage extends HtmlEditorActionBase {

  do() {
    const range = this.context.simpleWysiwygService.getRange();
    return this.context.modalService.openComponent({
      component: HtmlEditorInsertImgModalComponent,
      componentInitData: { title: '插入圖片' },
    }).pipe(
      tap((config: InsertImageConfig) => {
        this.context.simpleWysiwygService.restoreSelection(range);
        if (!config) { return; }
        this.addImg(config);
      })
    );
  }

  addImg(config: InsertImageConfig): HTMLImageElement {
    const editorContainer = this.context.editorContainer;
    this.context.simpleWysiwygService.execCommand(editorContainer, 'insertImage', config.src);
    const nowRange = this.context.simpleWysiwygService.getRange();
    const parent = nowRange.commonAncestorContainer;
    const children = Array.from(parent.childNodes) as HTMLElement[];
    const imgElement = children.find(child => child.tagName?.toLowerCase() === 'img' && !child.getAttribute('width') && !child.getAttribute('height')) as HTMLImageElement;
    if (imgElement) {
      imgElement.setAttribute('height', `${config.height}`);
      imgElement.setAttribute('width', `${config.width}`);
      imgElement.setAttribute('alt', `${config.alt}`);
      return imgElement;
    }
    return undefined;
  }
}
