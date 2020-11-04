import { HtmlEditorActionBase } from '../action.base';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HtmlEditorInsertVideoModalComponent } from '../../modal/html-editor-insert-video-modal/html-editor-insert-video-modal.component';
import { VIDEO_ATTR_FRAME_ID } from '../../const/html-editor-container.const';
import { HtmlEditorActionCategory } from '../action.enum';

export class InsertVideo extends HtmlEditorActionBase {
  category = HtmlEditorActionCategory.YOUTUBE;
  do() {
    const editorContainer = this.context.editorContainer;
    const selectedTarget = this.context.selectedTarget as HTMLElement;
    const image = selectedTarget?.tagName?.toLowerCase() === 'img' && selectedTarget.getAttribute(VIDEO_ATTR_FRAME_ID)
      ? selectedTarget as HTMLImageElement
      : undefined;
    // https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201810272230
    const range = this.context.simpleWysiwygService.getRange();
    if (!image && !range) { return of(undefined); }

    return this.context.modalService.openComponent({
      component: HtmlEditorInsertVideoModalComponent,
      componentInitData: {
        title: `${image ? '修改' : '加入'} Youtube 影片`,
        src: image?.src,
        frameId: image?.getAttribute(VIDEO_ATTR_FRAME_ID)
      }
    }).pipe(
      tap(config => {
        this.context.simpleWysiwygService.restoreSelection(range);
        if (!config) { return; }

        if (!image) {
          this.context.simpleWysiwygService.execCommand(editorContainer, 'insertImage', config.src);
          const nowRange = this.context.simpleWysiwygService.getRange();
          const parent = nowRange.commonAncestorContainer;
          const children = Array.from(parent.childNodes) as HTMLElement[];
          const img = children.find(child => child.tagName?.toLowerCase() === 'img' && !child.getAttribute('width') && !child.getAttribute('height')) as HTMLImageElement;
          if (img && img.tagName.toLowerCase() === 'img') {
            img.setAttribute(VIDEO_ATTR_FRAME_ID, config.frameId);
            img.src = config.src;
            img.style.width = '100%';
            img.style.height = 'auto';
          }
        } else {
          image.setAttribute(VIDEO_ATTR_FRAME_ID, config.frameId);
          image.src = config.src;
        }
        return;
      })
    );
  }
}
