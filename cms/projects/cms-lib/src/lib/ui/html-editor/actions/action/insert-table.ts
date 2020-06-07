import { HtmlEditorAction } from '../action.base';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HtmlEditorInsertTableModalComponent } from '../../modal/html-editor-insert-table-modal/html-editor-insert-table-modal.component';

export class InsertTable extends HtmlEditorAction {

  do() {
    const editorContainer = this.context.editorContainer;
    const commonAncestorContainer = this.context.commonAncestorContainer as HTMLElement;
    const image = commonAncestorContainer?.tagName.toLowerCase() === 'img'
      ? commonAncestorContainer as HTMLTableElement
      : undefined;
    // https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201810272230
    const range = this.context.simpleWysiwygService.getRange();
    if (!image && !range) { return of(undefined); }

    return this.context.modalService.openComponent({
      component: HtmlEditorInsertTableModalComponent,
      componentInitData: {
        title: `${image ? '修改' : '加入'}圖片`,
        // src: image?.src,
        // alt: image?.alt,
        // width: image?.width,
        // height: image?.height,
      }
    }).pipe(
      tap((config: { src: string, alt: string, width: number, height: number }) => {
        this.context.simpleWysiwygService.restoreSelection(range);
        if (!config) { return; }

        if (!image) {
          this.context.simpleWysiwygService.execCommand(editorContainer, 'insertImage', config.src);
          const range = this.context.simpleWysiwygService.getRange();
          const imgElement = range.commonAncestorContainer.childNodes[range.startOffset - 1] as HTMLImageElement;
          if (imgElement && imgElement.tagName.toLowerCase() === 'img') {
            imgElement.height = config.height;
            imgElement.width = config.width;
            imgElement.alt = config.alt;
          }
        } else {
          // image.src = config.src;
          // image.alt = config.alt;
          // image.width = config.width;
          // image.height = config.height;
        }
        return;
      })
    );
  }
}