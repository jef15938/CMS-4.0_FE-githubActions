import { IHtmlEditorContext } from '../../html-editor.interface';

export const HTML_EDITOR_ELEMENT_CONTROLLER = 'CMS_HTML_EDITOR_ELEMENT_CONTROLLER';

export abstract class HtmlEditorElementController<TElement extends HTMLElement> {

  protected abstract onAddToEditor(editorContainer: HTMLDivElement): void;
  protected abstract onRemovedFromEditor(editorContainer: HTMLDivElement): void;

  private _isInited = false;

  constructor(
    public el: TElement,
    public context: IHtmlEditorContext,
  ) {
    el[HTML_EDITOR_ELEMENT_CONTROLLER] = this;
  }

  onAdd(editorContainer: HTMLDivElement) {
    if (!this._isInited) {
      this.onAddToEditor(editorContainer);
      this._isInited = true;
    }
  }

  onRemove(editorContainer: HTMLDivElement) {
    if (!editorContainer.contains(this.el)) {
      this.onRemovedFromEditor(editorContainer);
    }
    this._isInited = false;
  }

  getElLowerCaseTagName() {
    return this.el?.tagName?.toLowerCase();
  }

}
