import { HtmlEditorElementController } from './../_base';
import { fromEvent, Subscription } from 'rxjs';

export class HtmlEditorTableController extends HtmlEditorElementController<HTMLTableElement> {

  private _subscriptions: Subscription[] = [];

  protected onAddToEditor(): void {
    this._subscribeEvents();
  }

  protected onRemovedFromEditor(): void {
    this._subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this._subscriptions = [];
  }

  private _subscribeEvents() {
    const selectionchange$ = fromEvent(document, 'selectionchange').subscribe(_ => {
      if (!this.context.isSelectionInsideEditorContainer) { return; }

      const range = this.context.simpleWysiwygService.getRange();

      if (this.el.contains(range?.startContainer)) {
        this._onSelected();
      } else {
        this._onUnselected();
      }
    });
    this._subscriptions.push(selectionchange$);
  }

  private _onSelected(): void {
    this.el.style.setProperty('outline', '3px solid #b4d7ff');
  }

  private _onUnselected(): void {
    this.el.style.removeProperty('outline');
  }

}