import { HtmlEditorElementController, HTML_EDITOR_ELEMENT_CONTROLLER } from './_base';
import { HtmlEditorImageController } from './image/image-controller';
import { HtmlEditorContext, HtmlEditorContextMenuItem } from '../../html-editor.interface';
import { HtmlEditorTableController } from './table/table-controller';
import { HtmlEditorVideoController } from './video/video-controller';

export class HtmlEditorElementControllerFactory {
  static addController(el: HTMLElement, context: HtmlEditorContext): HtmlEditorElementController<HTMLElement> {
    if (el?.nodeType === Node.ELEMENT_NODE) {
      const tagName = el.tagName?.toLowerCase();

      let controller: HtmlEditorElementController<HTMLElement>;

      switch (tagName) {
        case 'img':
          if (el.getAttribute('frame_id')) {
            controller =
              HtmlEditorElementControllerFactory.getController(el)
              || new HtmlEditorVideoController(el as HTMLImageElement, context);
          } else {
            controller =
              HtmlEditorElementControllerFactory.getController(el)
              || new HtmlEditorImageController(el as HTMLImageElement, context);
          }
          break;
        case 'table':
          controller =
            HtmlEditorElementControllerFactory.getController(el)
            || new HtmlEditorTableController(el as HTMLTableElement, context);
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

  static getContextMenuItems(el: HTMLElement): HtmlEditorContextMenuItem[] {
    const controller = HtmlEditorElementControllerFactory.getController(el);
    return controller?.contextMenuItems || [];
  }
}
