import { HtmlEditorContext, HtmlEditorContextMenuItem } from '../../html-editor.interface';

export const HTML_EDITOR_ELEMENT_CONTROLLER = 'CMS_HTML_EDITOR_ELEMENT_CONTROLLER';

export abstract class HtmlEditorElementController<TElement extends HTMLElement> {

  abstract contextMenuItems: HtmlEditorContextMenuItem[];

  public el: TElement;
  public context: HtmlEditorContext;
  public isInited = false;
  public isDeleted = false;

  protected abstract onAddToEditor(): void;
  protected abstract onRemovedFromEditor(): void;

  get elLowerCaseTagName() { return this.el?.tagName?.toLowerCase(); }

  constructor(
    el: TElement,
    context: HtmlEditorContext,
  ) {
    el[HTML_EDITOR_ELEMENT_CONTROLLER] = this;
    this.el = el;
    this.context = context;
  }

  addToEditor(editorContainer: HTMLDivElement) {
    if (this.isInited || this.isDeleted) { return; }
    this.onAddToEditor();
    this.isInited = true;
  }

  removeFromEditor(editorContainer: HTMLDivElement) {
    if (this.isDeleted) { return; }
    try {
      this.onRemovedFromEditor();
    } catch (error) {
      console.error('removeFromEditor()', error);
    }
    this.isDeleted = true;
    this.el[HTML_EDITOR_ELEMENT_CONTROLLER] = undefined;
    this.el = undefined;
    this.context = undefined;
  }

}
