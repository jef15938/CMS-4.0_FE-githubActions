import { TemplatesContainerComponent, LayoutWrapperComponent } from '@neux/render';
import { ContentInfoModel } from '../../../global/api/data-model/models/content-info.model';

export enum EditorMode {
  EDIT, INFO, READ,
}

export enum ContentEditorActionMode {
  LAYOUT = 'LAYOUT',
  TEMPLATE = 'TEMPLATE',
}

export class ContentEditorSaveEvent {
  contentInfo: ContentInfoModel;
  /** change Editor save status */
  editorSave: () => void;
}

export interface ContentEditorContext {
  getRootTemplatesContainersOfBlocksByLanguage: () => TemplatesContainerComponent[][];
  findLayoutWrapperByTemplateInfoId: (templateInfoId: string, source: TemplatesContainerComponent) => LayoutWrapperComponent;
  findParentLayoutWrapperOfTemplatesContainer: (
    templatesContainer: TemplatesContainerComponent,
    source: TemplatesContainerComponent,
    parent?: LayoutWrapperComponent,
  ) => LayoutWrapperComponent;
}
