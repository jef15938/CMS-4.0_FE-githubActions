import { HtmlEditorActionBase } from '../action.base';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HtmlEditorInsertImgModalComponent } from '../../modal/html-editor-insert-img-modal/html-editor-insert-img-modal.component';

export interface ModifyImageConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export class ModifyImage extends HtmlEditorActionBase {

  do() {
    const commonAncestorContainer = this.context.commonAncestorContainer as HTMLElement;
    const image = commonAncestorContainer?.tagName?.toLowerCase() === 'img' && !commonAncestorContainer.getAttribute('frameId')
      ? commonAncestorContainer as HTMLImageElement
      : undefined;
    // https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201810272230
    const range = this.context.simpleWysiwygService.getRange();
    if (!image || !range) { return of(undefined); }

    return this.context.modalService.openComponent({
      component: HtmlEditorInsertImgModalComponent,
      componentInitData: {
        title: '圖片設定',
        src: image.src,
        alt: image.alt,
        width: image.width,
        height: image.height,
      }
    }).pipe(
      tap((config: ModifyImageConfig) => {
        this.context.simpleWysiwygService.restoreSelection(range);
        if (!config) { return; }
        this.editImg(image, config);
      })
    );
  }

  editImg(img: HTMLImageElement, config: ModifyImageConfig) {
    img.src = config.src;
    img.alt = config.alt;
    img.width = config.width;
    img.height = config.height;
  }
}
