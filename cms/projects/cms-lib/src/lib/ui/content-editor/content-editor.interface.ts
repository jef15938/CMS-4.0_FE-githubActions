import { Observable } from 'rxjs';
import { ContentInfo } from './../../neuxAPI/bean/ContentInfo';
import { TemplateGetResponse } from './../../neuxAPI/bean/TemplateGetResponse';

export enum EditorMode {
  EDIT, INFO, READ,
}

export interface ContentEditorServiceConfig {
  contentInfo: ContentInfo;
  mode: EditorMode;
  selectableTemplates: TemplateGetResponse;
}

export interface ContentEditorServiceInterface {
  openEditor(config: ContentEditorServiceConfig): Observable<any>;
}

export class ContentEditorSaveEvent {
  contentInfo: ContentInfo;
  /** change Editor save status */
  editorSave: () => void;
}
