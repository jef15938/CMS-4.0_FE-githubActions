import { HtmlEditorActionBase } from '../action.base';
import { of } from 'rxjs';
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
    const commonAncestorContainer = this.context.commonAncestorContainer as HTMLElement;
    const image = commonAncestorContainer?.tagName?.toLowerCase() === 'img' && !commonAncestorContainer.getAttribute('frameId')
      ? commonAncestorContainer as HTMLImageElement
      : undefined;
    // https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201810272230
    const range = this.context.simpleWysiwygService.getRange();
    if (!image && !range) { return of(undefined); }

    return this.context.modalService.openComponent({
      component: HtmlEditorInsertImgModalComponent,
      componentInitData: {
        title: `${image ? '修改' : '加入'}圖片`,
        src: image?.src,
        alt: image?.alt,
        width: image?.width,
        height: image?.height,
      }
    }).pipe(
      tap((config: InsertImageConfig) => {
        this.context.simpleWysiwygService.restoreSelection(range);
        if (!config) { return; }
        if (!image) {
          this.addImg(config);
        } else {
          this.editImg(image, config);
        }
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

  editImg(img: HTMLImageElement, config: InsertImageConfig) {
    img.src = config.src;
    img.alt = config.alt;
    img.width = config.width;
    img.height = config.height;
  }
}
