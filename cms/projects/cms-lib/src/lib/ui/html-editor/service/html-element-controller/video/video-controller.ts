import { HtmlEditorElementController } from '../_base';
import { fromEvent, Subscription } from 'rxjs';
import { IHtmlEditorContextMenuItem } from '../../../html-editor.interface';
import { InsertVideo } from '../../../actions/action/insert-video';

export class HtmlEditorVideoController extends HtmlEditorElementController<HTMLImageElement> {

  contextMenuItems: IHtmlEditorContextMenuItem[];

  private subscriptions: Subscription[] = [];
  private mutationObserver: MutationObserver;

  protected onAddToEditor(): void {
    this.contextMenuItems = [
      { text: '影片設定', icon: 'edit', action: new InsertVideo(this.context) },
    ];

    this.subscribeEvents();
  }

  protected onRemovedFromEditor(): void {
    this.mutationObserver?.disconnect();
    this.mutationObserver = undefined;

    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  private subscribeEvents() {
    const selectionchange$ = fromEvent(document, 'selectionchange').subscribe(_ => {
      this.checkSelected();
    });
    this.subscriptions.push(selectionchange$);
  }

  private checkSelected() {
    if (!this.context.isSelectionInsideEditorContainer) { return; }

    const range = this.context.simpleWysiwygService.getRange();

    if (range.commonAncestorContainer === this.el) {
      this.onSelected();
    } else {
      this.onUnselected();
    }
  }

  private onSelected(): void {
    this.el.style.setProperty('outline', '3px solid #b4d7ff');
  }

  private onUnselected(): void {
    this.el.style.removeProperty('outline');
  }

  private evPreventDefaultAndStopPropagation = (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
  }

}