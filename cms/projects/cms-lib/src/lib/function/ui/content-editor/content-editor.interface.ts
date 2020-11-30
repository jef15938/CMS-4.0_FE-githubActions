import { TemplatesContainerComponent, TemplateWrapperComponent } from '@neux/render';
import { ContentInfoModel } from '../../../global/api/data-model/models/content-info.model';

export enum EditorMode {
  EDIT, INFO, READ,
}

export class ContentEditorSaveEvent {
  save: boolean;
  contentInfo: ContentInfoModel;
  /** change Editor save status */
  editorSave: () => void;
}

export interface ContentEditorContext {
  getRootTemplatesContainersOfBlocksByLanguage: () => TemplatesContainerComponent[][];
  findTemplateWrapperByTemplateInfoId: (templateInfoId: string, source: TemplatesContainerComponent) => TemplateWrapperComponent;
  findParentTemplateWrapperOfTemplatesContainer: (
    templatesContainer: TemplatesContainerComponent,
    source: TemplatesContainerComponent,
    parent?: TemplateWrapperComponent,
  ) => TemplateWrapperComponent;
}
