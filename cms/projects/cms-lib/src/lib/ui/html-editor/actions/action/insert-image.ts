import { HtmlEditorAction } from '../action.base';
import { HtmlEditorInsertImgModalComponent } from '../../modal/html-editor-insert-img-modal/html-editor-insert-img-modal.component';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

export class InsertImage extends HtmlEditorAction {

  do() {
    const editorContainer = this.context.editorContainer.nativeElement;
    const selected = this.context.getSelected();
    const image = selected && selected.tagName.toLowerCase() === 'img' ? selected as HTMLImageElement : undefined;
    // https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201810272230
    const savedSelection = this.context.simpleWysiwygService.saveSelection();
    if (!image && !savedSelection) { return of(undefined); }

    return this.context.modalService.openComponent({
      component: HtmlEditorInsertImgModalComponent,
      componentInitData: {
        title: `${image ? '修改' : '加入'}圖片`,
        src: image?.src || '',
        alt: image?.alt || '',
        width: image?.width || null,
        height: image?.height || null,
      }
    }).pipe(
      tap((config: { src: string, alt: string, width: number, height: number }) => {
        this.context.simpleWysiwygService.restoreSelection(savedSelection);
        if (!config) { return; }

        if (!image) {
          const img = document.createElement('img');
          img.src = config.src;
          img.alt = config.alt || '';
          img.width = config.width;
          img.height = config.height;
          this.context.simpleWysiwygService.execCommand(editorContainer, 'insertImage', img.src, true);
        } else {
          image.src = config.src;
          image.alt = config.alt || '';
          image.width = config.width;
          image.height = config.height;
        }
      })
    );
  }
}