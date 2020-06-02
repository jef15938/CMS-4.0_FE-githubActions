import { Injectable } from '@angular/core';
import { HtmlEditorAction } from './action.base';
import { HtmlEditorInsertImgModalComponent } from '../modal/html-editor-insert-img-modal/html-editor-insert-img-modal.component';

@Injectable({ providedIn: 'root' })
export class InsertImage extends HtmlEditorAction {

  do(editorBlock: HTMLDivElement, image?: HTMLImageElement) {
    // https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201810272230
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
      } else {
        image.src = config.src;
        image.alt = config.alt || '';
        image.width = config.width;
        image.height = config.height;
      }

    });
  }
}