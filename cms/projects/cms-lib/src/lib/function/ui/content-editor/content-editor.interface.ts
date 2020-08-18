import { ContentInfo } from './../../../global/api/neuxAPI/bean/ContentInfo';
import { TemplatesContainerComponent, LayoutWrapperComponent } from '@neux/render';

export enum EditorMode {
  EDIT, INFO, READ,
}

export enum ContentEditorActionMode {
  LAYOUT = 'LAYOUT',
  TEMPLATE = 'TEMPLATE',
}

export class ContentEditorSaveEvent {
  contentInfo: ContentInfo;
  /** change Editor save status */
  editorSave: () => void;
}

export interface ContentEditorContext {
  getRootTemplatesContainerComponents: () => TemplatesContainerComponent[];
  findLayoutWrapperByTemplateInfoId: (templateInfoId: string, source: TemplatesContainerComponent) => LayoutWrapperComponent;
  findParentLayoutWrapperOfTemplatesContainer: (
    templatesContainer: TemplatesContainerComponent,
    source: TemplatesContainerComponent,
    parent?: LayoutWrapperComponent,
  ) => LayoutWrapperComponent;
}
