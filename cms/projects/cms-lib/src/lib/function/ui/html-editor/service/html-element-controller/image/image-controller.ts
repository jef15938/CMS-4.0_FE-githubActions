import { HtmlEditorElementController } from '../_base';
import { fromEvent, Subscription } from 'rxjs';
import { HtmlEditorContextMenuItem } from '../../../html-editor.interface';
import { ModifyImage, CreateLink } from '../../../actions/action/_index';

const IS_FAKE = 'IS_FAKE';

export class HtmlEditorImageController extends HtmlEditorElementController<HTMLImageElement> {

  contextMenuItems: HtmlEditorContextMenuItem[];

  private controllers: HTMLDivElement[];
  private subscriptions: Subscription[] = [];
  private mutationObserver: MutationObserver;

  protected onAddToEditor(): void {
    if (this.el[IS_FAKE]) { return; }

    this.contextMenuItems = [
      { text: '圖片設定', icon: 'edit', action: new ModifyImage(this.context) },
      { text: '連結', icon: 'link', action: new CreateLink(this.context) },
    ];

    const parent = this.findParent();
    if (!parent) { return; }
    this.subscribeEvents();
  }

  protected onRemovedFromEditor(): void {
    if (this.el[IS_FAKE]) { return; }

    this.mutationObserver?.disconnect();
    this.mutationObserver = undefined;

    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];

    this.unRegisterSizeControl();
  }

  private subscribeEvents() {
    if (this.el[IS_FAKE]) { return; }

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

  private findParent(): HTMLElement {
    return this.context.simpleWysiwygService.findRowRoot(this.context.editorContainer, this.el);
  }

  private onSelected(): void {
    if (this.el[IS_FAKE]) { return; }

    this.el.style.setProperty('outline', '3px solid #b4d7ff');

    const controllers = this.controllers || [];
    if (!controllers.length) { return; }

    const editorContainer = this.context.editorContainer;
    const img = this.el;

    const topLeft = controllers[0];
    const topRight = controllers[1];
    const bottomLeft = controllers[2];
    const bottomRight = controllers[3];
    topLeft.style.top = topRight.style.top = `${img.offsetTop - 5}px`;
    topLeft.style.left = bottomLeft.style.left = `${img.offsetLeft - 5}px`;
    topRight.style.left = bottomRight.style.left = `${img.offsetLeft + img.width - 5}px`;
    bottomLeft.style.top = bottomRight.style.top = `${img.offsetTop + img.height - 5}px`;
    this.controllers?.forEach(c => {
      if (!this.context.simpleWysiwygService.isChildOf(c, editorContainer)) {
        editorContainer.appendChild(c);
      }
    });
  }

  private onUnselected(): void {
    if (this.el[IS_FAKE]) { return; }

    this.el.style.removeProperty('outline');

    const editorContainer = this.context.editorContainer;
    this.controllers?.forEach(c => {
      if (this.context.simpleWysiwygService.isChildOf(c, editorContainer)) {
        editorContainer.removeChild(c);
      }
    });
  }

  private unRegisterSizeControl() {
    if (this.el[IS_FAKE]) { return; }

    const editorContainer = this.context.editorContainer;
    this.controllers?.forEach(c => {
      if (this.context.simpleWysiwygService.isChildOf(c, editorContainer)) {
        c.removeEventListener('click', this.evPreventDefaultAndStopPropagation);
        editorContainer.removeChild(c);
      }
    });
    this.controllers = [];
  }

  private evPreventDefaultAndStopPropagation = (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
  }

}
