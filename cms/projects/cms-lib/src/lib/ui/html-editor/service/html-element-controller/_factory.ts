import { HtmlEditorElementController, HTML_EDITOR_ELEMENT_CONTROLLER } from './_base';
import { HtmlEditorImageController } from './image/image-controller';
import { IHtmlEditorContext } from '../../html-editor.interface';
import { HtmlEditorTableController } from './table/table-controller';

export class HtmlEditorElementControllerFactory {
  static addController(el: HTMLElement, context: IHtmlEditorContext): HtmlEditorElementController<HTMLElement> {
    if (el?.nodeType === Node.ELEMENT_NODE) {
      const tagName = el.tagName?.toLowerCase();

      let controller: HtmlEditorElementController<HTMLElement>;

      switch (tagName) {
        case 'img':
          controller = HtmlEditorElementControllerFactory.getController(el) || new HtmlEditorImageController(el as HTMLImageElement, context);
          break;
        case 'table':
          controller = HtmlEditorElementControllerFactory.getController(el) || new HtmlEditorTableController(el as HTMLTableElement, context);
          break;
      }

      if (controller) {
        el[HTML_EDITOR_ELEMENT_CONTROLLER] = controller;
        return controller;
      }
    }
  }

  static getController(el: HTMLElement): HtmlEditorElementController<HTMLElement> {
    return el ? el[HTML_EDITOR_ELEMENT_CONTROLLER] : undefined;
  }
}