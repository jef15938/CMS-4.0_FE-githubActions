import { HtmlEditorAction } from '../action.base';
import { HtmlEditorInsertImgModalComponent } from '../../modal/html-editor-insert-img-modal/html-editor-insert-img-modal.component';

export class InsertImage extends HtmlEditorAction {

  do() {
    const selected = this.context.getSelected();
    const image = selected && selected.tagName.toLowerCase() === 'img' ? selected as HTMLImageElement : undefined;
    // https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201810272230
    const range = this.context.selecitonRangeService.getRange();
    if (!range) { return; }

    this.context.modalService.openComponent({
      component: HtmlEditorInsertImgModalComponent,
      componentInitData: {
        title: `${image ? '修改' : '加入'}圖片`,
        src: image?.src || '',
        alt: image?.alt || '',
        width: image?.width || null,
        height: image?.height || null,
      }
    }).subscribe((config: { src: string, alt: string, width: number, height: number }) => {
      if (!config) { this.context.selecitonRangeService.restoreRange(range); return; }

      if (!image) {
        const container = range.commonAncestorContainer.parentElement;
        const img = document.createElement('img');
        img.src = config.src;
        img.alt = config.alt || '';
        img.width = config.width;
        img.height = config.height;
        container.appendChild(img);
      } else {
        image.src = config.src;
        image.alt = config.alt || '';
        image.width = config.width;
        image.height = config.height;
      }

    });
  }
}