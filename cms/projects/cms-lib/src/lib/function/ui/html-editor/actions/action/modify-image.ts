import { HtmlEditorActionBase } from '../action.base';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HtmlEditorInsertImgModalComponent } from '../../modal/html-editor-insert-img-modal/html-editor-insert-img-modal.component';
import { ATTRIBUTE_GALLERY_ID, ATTRIBUTE_FRAME_ID, ATTRIBUTE_GALLERY_NAME, ATTRIBUTE_GALLERY_ORIGINAL_ID, ATTRIBUTE_GALLERY_ORIGINAL_PATH } from '../../const/html-editor-container.const';

export interface ModifyImageConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
  galleryID: number;
  galleryName: string;
  originID: number;
  originPath: string;
}

export class ModifyImage extends HtmlEditorActionBase {

  do() {
    const selectedTarget = this.context.selectedTarget as HTMLElement;
    const image = selectedTarget?.tagName?.toLowerCase() === 'img' && !selectedTarget.getAttribute(ATTRIBUTE_FRAME_ID)
      ? selectedTarget as HTMLImageElement
      : undefined;
    // https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201810272230
    const range = this.context.simpleWysiwygService.getRange();
    if (!image || !range) { return of(undefined); }

    const galleryIDAttribute = image.getAttribute(ATTRIBUTE_GALLERY_ID);
    const galleryID = galleryIDAttribute ? +galleryIDAttribute : null;
    const galleryName = image.getAttribute(ATTRIBUTE_GALLERY_NAME);
    const originID = image.getAttribute(ATTRIBUTE_GALLERY_ORIGINAL_ID);
    const originPath = image.getAttribute(ATTRIBUTE_GALLERY_ORIGINAL_PATH);
    const src = image.getAttribute('src') || '';
    return this.context.modalService.openComponent({
      component: HtmlEditorInsertImgModalComponent,
      componentInitData: {
        title: '圖片設定',
        src,
        alt: image.alt,
        width: image.width,
        height: image.height,
        galleryID,
        galleryName,
        originID: +originID,
        originPath,
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
    img.setAttribute(ATTRIBUTE_GALLERY_ID, `${config.galleryID || ''}`);
    img.setAttribute(ATTRIBUTE_GALLERY_NAME, `${config.galleryName || ''}`);
    img.setAttribute(ATTRIBUTE_GALLERY_ORIGINAL_ID, `${config.originID || ''}`);
    img.setAttribute(ATTRIBUTE_GALLERY_ORIGINAL_PATH, `${config.originPath || ''}`);
  }
}
