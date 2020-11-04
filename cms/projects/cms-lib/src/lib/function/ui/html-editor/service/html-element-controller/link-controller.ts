import { fromEvent, Subscription } from 'rxjs';
import { HtmlEditorElementController } from './_base';
import { HtmlEditorContextMenuItem } from '../../html-editor.interface';
import { CreateLink } from '../../actions/action/_index';
import { HtmlEditorActionCategory } from '../../actions/action.enum';

export class HtmlEditorLinkController extends HtmlEditorElementController<HTMLImageElement> {

  contextMenuItems: HtmlEditorContextMenuItem[];

  private subscriptions: Subscription[] = [];
  private mutationObserver: MutationObserver;

  protected onAddToEditor(): void {
    this.contextMenuItems = [
      { id: 'link', category: HtmlEditorActionCategory.LINK, text: '連結設定', icon: 'edit', action: new CreateLink(this.context) },
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

    const range = this.context.simpleWysiwygService.getRange();
    if (this.context.selectedTarget === this.el || this.context.simpleWysiwygService.isChildOf(range.commonAncestorContainer, this.el)) {
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

}
