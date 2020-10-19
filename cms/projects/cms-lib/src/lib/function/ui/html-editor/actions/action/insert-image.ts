import { HtmlEditorActionBase } from '../action.base';
import { tap } from 'rxjs/operators';
import { HtmlEditorInsertImgModalComponent } from '../../modal/html-editor-insert-img-modal/html-editor-insert-img-modal.component';
import { ATTRIBUTE_GALLERY_ID, ATTRIBUTE_GALLERY_NAME } from '../../const/html-editor-container.const';
import { HtmlEditorActionCategory } from '../action.enum';

export interface InsertImageConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
  galleryID: number;
  galleryName: string;
}

export class InsertImage extends HtmlEditorActionBase {
  category = HtmlEditorActionCategory.IMAGE;
  do() {
    const range = this.context.simpleWysiwygService.getRange();
    return this.context.modalService.openComponent({
      component: HtmlEditorInsertImgModalComponent,
      componentInitData: { title: '插入圖片' },
    }).pipe(
      tap(config => {
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
    const img = children.find(child => child.tagName?.toLowerCase() === 'img' && !child.getAttribute('width') && !child.getAttribute('height')) as HTMLImageElement;
    if (img) {
      img.setAttribute('gallery-id', `${config.galleryID}`);
      img.setAttribute('height', `${config.height}`);
      img.setAttribute('width', `${config.width}`);
      img.setAttribute('alt', `${config.alt}`);
      img.setAttribute(ATTRIBUTE_GALLERY_ID, `${config.galleryID || ''}`);
      img.setAttribute(ATTRIBUTE_GALLERY_NAME, `${config.galleryName || ''}`);

      return img;
    }
    return undefined;
  }
}
