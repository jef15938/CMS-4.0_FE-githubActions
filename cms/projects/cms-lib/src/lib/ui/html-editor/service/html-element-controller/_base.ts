import { IHtmlEditorContext, IHtmlEditorContextMenuItem } from '../../html-editor.interface';

export const HTML_EDITOR_ELEMENT_CONTROLLER = 'CMS_HTML_EDITOR_ELEMENT_CONTROLLER';

export abstract class HtmlEditorElementController<TElement extends HTMLElement> {

  protected abstract onAddToEditor(): void;
  protected abstract onRemovedFromEditor(): void;
  abstract contextMenuItems: IHtmlEditorContextMenuItem[];

  public el: TElement;
  public context: IHtmlEditorContext;
  public isInited = false;
  public isDeleted = false;
  get elLowerCaseTagName() { return this.el?.tagName?.toLowerCase(); }

  constructor(
    el: TElement,
    context: IHtmlEditorContext,
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
    if (this.isDeleted || !editorContainer.contains(this.el)) { return; }
    this.onRemovedFromEditor();
    this.isDeleted = true;
    this.el[HTML_EDITOR_ELEMENT_CONTROLLER] = undefined;
    this.el = undefined;
    this.context = undefined;
  }

}
