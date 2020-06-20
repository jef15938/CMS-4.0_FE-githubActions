import { HtmlEditorActionBase } from '../action.base';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HtmlEditorInsertVideoModalComponent } from '../../modal/html-editor-insert-video-modal/html-editor-insert-video-modal.component';

export class InsertVideo extends HtmlEditorActionBase {

  do() {
    const editorContainer = this.context.editorContainer;
    const commonAncestorContainer = this.context.commonAncestorContainer as HTMLElement;
    const image = commonAncestorContainer?.tagName?.toLowerCase() === 'img' && commonAncestorContainer.getAttribute('frame_id')
      ? commonAncestorContainer as HTMLImageElement
      : undefined;
    // https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201810272230
    const range = this.context.simpleWysiwygService.getRange();
    if (!image && !range) { return of(undefined); }

    return this.context.modalService.openComponent({
      component: HtmlEditorInsertVideoModalComponent,
      componentInitData: {
        title: `${image ? '修改' : '加入'}影片`,
        src: image?.src,
        frame_id: image?.getAttribute('frame_id')
      }
    }).pipe(
      tap((config: { src: string, frame_id: string }) => {
        this.context.simpleWysiwygService.restoreSelection(range);
        if (!config) { return; }

        if (!image) {
          this.context.simpleWysiwygService.execCommand(editorContainer, 'insertImage', config.src);
          const nowRange = this.context.simpleWysiwygService.getRange();
          const imgElement = nowRange.commonAncestorContainer.childNodes[nowRange.startOffset - 1] as HTMLImageElement;
          if (imgElement && imgElement.tagName.toLowerCase() === 'img') {
            imgElement.setAttribute('frame_id', config.frame_id);
            imgElement.src = config.src;
            imgElement.style.width = '100%';
            imgElement.style.height = 'auto';
          }
        } else {
          image.setAttribute('frame_id', config.frame_id);
          image.src = config.src;
        }
        return;
      })
    );
  }
}
