import { IHtmlEditorContext, IHtmlEditorContextMenuItem } from '../../html-editor.interface';

export const HTML_EDITOR_ELEMENT_CONTROLLER = 'CMS_HTML_EDITOR_ELEMENT_CONTROLLER';

export abstract class HtmlEditorElementController<TElement extends HTMLElement> {

  protected abstract onAddToEditor(): void;
  protected abstract onRemovedFromEditor(): void;
  abstract contextMenuItems: IHtmlEditorContextMenuItem[];

  private _el: TElement;
  private _context: IHtmlEditorContext;
  private _isInited = false;
  private _isDeleted = false;

  get el() { return this._el }
  get context() { return this._context; }
  get isInited() { return this._isInited; }
  get isDeleted() { return this._isDeleted; }
  get elLowerCaseTagName() { return this.el?.tagName?.toLowerCase(); }

  constructor(
    el: TElement,
    context: IHtmlEditorContext,
  ) {
    el[HTML_EDITOR_ELEMENT_CONTROLLER] = this;
    this._el = el;
    this._context = context;
  }

  addToEditor(editorContainer: HTMLDivElement) {
    if (this._isInited || this._isDeleted) { return; }
    this.onAddToEditor();
    this._isInited = true;
  }

  removeFromEditor(editorContainer: HTMLDivElement) {
    if (this._isDeleted || !editorContainer.contains(this.el)) { return; }
    this.onRemovedFromEditor();
    this._isDeleted = true;
    this.el[HTML_EDITOR_ELEMENT_CONTROLLER] = undefined;
    this._el = undefined;
    this._context = undefined;
  }

}
