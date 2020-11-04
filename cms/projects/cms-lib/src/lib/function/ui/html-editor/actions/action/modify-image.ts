import { HtmlEditorActionBase } from '../action.base';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HtmlEditorInsertImgModalComponent } from '../../modal/html-editor-insert-img-modal/html-editor-insert-img-modal.component';
import { GALLERY_ATTR_GALLERY_ID, VIDEO_ATTR_FRAME_ID, GALLERY_ATTR_GALLERY_NAME } from '../../const/html-editor-container.const';
import { HtmlEditorActionCategory } from '../action.enum';

export interface ModifyImageConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
  galleryID: number;
  galleryName: string;
}

export class ModifyImage extends HtmlEditorActionBase {
  category = HtmlEditorActionCategory.IMAGE;
  do() {
    const selectedTarget = this.context.selectedTarget as HTMLElement;
    const image = selectedTarget?.tagName?.toLowerCase() === 'img' && !selectedTarget.getAttribute(VIDEO_ATTR_FRAME_ID)
      ? selectedTarget as HTMLImageElement
      : undefined;
    // https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201810272230
    const range = this.context.simpleWysiwygService.getRange();
    if (!image || !range) { return of(undefined); }

    const galleryIDAttribute = image.getAttribute(GALLERY_ATTR_GALLERY_ID);
    const galleryID = galleryIDAttribute ? +galleryIDAttribute : null;
    const galleryName = image.getAttribute(GALLERY_ATTR_GALLERY_NAME);
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
      }
    }).pipe(
      tap(config => {
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
    img.setAttribute(GALLERY_ATTR_GALLERY_ID, `${config.galleryID || ''}`);
    img.setAttribute(GALLERY_ATTR_GALLERY_NAME, `${config.galleryName || ''}`);
  }
}
