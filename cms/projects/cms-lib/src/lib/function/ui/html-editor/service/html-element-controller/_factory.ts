import { HtmlEditorElementController, HTML_EDITOR_ELEMENT_CONTROLLER } from './_base';
import { HtmlEditorContext, HtmlEditorContextMenuItem } from '../../html-editor.interface';
import { HtmlEditorImageController } from './image/image-controller';
import { HtmlEditorTableController } from './table/table-controller';
import { HtmlEditorVideoController } from './video/video-controller';
import { HtmlEditorLinkController } from './link-controller';
import { HtmlEditorGalleryFileController } from './gallery-file-controller';
import { ATTRIBUTE_FRAME_ID, CLASS_NAME_EDITOR_LINK, CLASS_NAME_GALLERY_FILE } from '../../const/html-editor-container.const';

export class HtmlEditorElementControllerFactory {
  static addController(el: HTMLElement, context: HtmlEditorContext): HtmlEditorElementController<HTMLElement> {
    if (el?.nodeType === Node.ELEMENT_NODE) {
      const tagName = el.tagName?.toLowerCase();

      let controller: HtmlEditorElementController<HTMLElement>;

      switch (tagName) {
        case 'a':
          if (el.classList?.contains(CLASS_NAME_EDITOR_LINK)) {
            controller =
              HtmlEditorElementControllerFactory.getController(el)
              || new HtmlEditorLinkController(el as HTMLImageElement, context);
          } else if (el.classList?.contains(CLASS_NAME_GALLERY_FILE)) {
            controller =
              HtmlEditorElementControllerFactory.getController(el)
              || new HtmlEditorGalleryFileController(el as HTMLImageElement, context);
          }
          break;
        case 'img':
          if (el.getAttribute(ATTRIBUTE_FRAME_ID)) {
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
    return null;
  }

  static getController(el: HTMLElement): HtmlEditorElementController<HTMLElement> {
    return el ? el[HTML_EDITOR_ELEMENT_CONTROLLER] : undefined;
  }

  static getContextMenuItems(el: HTMLElement): HtmlEditorContextMenuItem[] {
    const controller = HtmlEditorElementControllerFactory.getController(el);
    return controller?.contextMenuItems || [];
  }
}
