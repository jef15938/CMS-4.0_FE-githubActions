import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';
import { Observable } from 'rxjs';
import { TemplateGetResponse } from '../../neuxAPI/bean/TemplateGetResponse';

export enum EditorMode {
  EDIT, INFO, READ,
}

export interface IContentEditorServiceConfig {
  contentInfo: ContentInfo;
  mode: EditorMode;
  selectableTemplates: TemplateGetResponse;
}

export interface IContentEditorService {
  openEditor(config: IContentEditorServiceConfig): Observable<any>;
}

export class ContentEditorSaveEvent {
  contentInfo: ContentInfo;
  /** change Editor save status */
  editorSave: () => void;
}
