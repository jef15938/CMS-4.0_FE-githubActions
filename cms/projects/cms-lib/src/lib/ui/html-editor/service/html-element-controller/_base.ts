import { IHtmlEditorContext } from '../../html-editor.interface';

export const HTML_EDITOR_ELEMENT_CONTROLLER = 'CMS_HTML_EDITOR_ELEMENT_CONTROLLER';

export abstract class HtmlEditorElementController<TElement extends HTMLElement> {

  abstract onAddToEditor(editorContainer: HTMLDivElement): void;
  abstract onRemovedFromEditor(editorContainer: HTMLDivElement): void;
  abstract onSelected(): void;
  abstract onUnselected(): void;

  constructor(
    public el: TElement,
    public context: IHtmlEditorContext,
  ) {
    el[HTML_EDITOR_ELEMENT_CONTROLLER] = this;
  }

  getElLowerCaseTagName() {
    return this.el?.tagName?.toLowerCase();
  }

}
