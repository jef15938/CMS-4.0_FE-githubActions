import { HtmlEditorElementController } from '../_base';
import { fromEvent, Subscription } from 'rxjs';
import { IHtmlEditorContextMenuItem } from '../../../html-editor.interface';
import { InsertVideo } from '../../../actions/action/insert-video';

export class HtmlEditorVideoController extends HtmlEditorElementController<HTMLImageElement> {

  contextMenuItems: IHtmlEditorContextMenuItem[];

  private _subscriptions: Subscription[] = [];
  private _mutationObserver: MutationObserver;

  protected onAddToEditor(): void {
    this.contextMenuItems = [
      { text: '影片設定', icon: 'edit', action: new InsertVideo(this.context) },
    ];

    this._subscribeEvents();
  }

  protected onRemovedFromEditor(): void {
    this._mutationObserver?.disconnect();
    this._mutationObserver = undefined;

    this._subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this._subscriptions = [];
  }

  private _subscribeEvents() {
    const selectionchange$ = fromEvent(document, 'selectionchange').subscribe(_ => {
      this._checkSelected();
    });
    this._subscriptions.push(selectionchange$);
  }

  private _checkSelected() {
    if (!this.context.isSelectionInsideEditorContainer) { return; }

    const range = this.context.simpleWysiwygService.getRange();

    if (range.commonAncestorContainer === this.el) {
      this._onSelected();
    } else {
      this._onUnselected();
    }
  }

  private _onSelected(): void {
    this.el.style.setProperty('outline', '3px solid #b4d7ff');
  }

  private _onUnselected(): void {
    this.el.style.removeProperty('outline');
  }

  private _evPreventDefaultAndStopPropagation = (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
  }

}