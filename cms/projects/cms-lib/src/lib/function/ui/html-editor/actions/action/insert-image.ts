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
    const imgElement = nowRange.commonAncestorContainer.childNodes[nowRange.startOffset - 1] as HTMLImageElement;
    if (imgElement && imgElement.tagName.toLowerCase() === 'img') {
      imgElement.height = config.height;
      imgElement.width = config.width;
      imgElement.alt = config.alt;
      return imgElement;
    }
    return undefined;
  }
}
