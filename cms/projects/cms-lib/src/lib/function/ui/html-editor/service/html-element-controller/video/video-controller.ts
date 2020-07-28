import { HtmlEditorElementController } from '../_base';
import { fromEvent, Subscription } from 'rxjs';
import { HtmlEditorContextMenuItem } from '../../../html-editor.interface';
import { InsertVideo } from '../../../actions/action/insert-video';

export class HtmlEditorVideoController extends HtmlEditorElementController<HTMLImageElement> {

  contextMenuItems: HtmlEditorContextMenuItem[];

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
    const selectionchange$ = fromEvent(document, 'selectionchange')
      .subscribe(_ => setTimeout(() => this.checkSelected(), 0));
    this.subscriptions.push(selectionchange$);
  }

  private checkSelected() {
    if (!this.context.isSelectionInsideEditorContainer) { return; }
    if (!this.context.editorContainer.contains(this.el)) { return; }
    const parent = this.el.parentNode;
    const children = Array.from(parent.childNodes);
    const index = children.indexOf(this.el);

    const sel = window.getSelection();
    if (
      sel.anchorNode === parent
      && sel.focusNode === parent
      && sel.anchorOffset === index
      && sel.focusOffset === index + 1
    ) {
      this.onSelected();
      return;
    }

    this.onUnselected();
  }

  private onSelected(): void {
    this.el.style.setProperty('outline', '3px solid #b4d7ff');
  }

  private onUnselected(): void {
    this.el.style.removeProperty('outline');
  }

}
