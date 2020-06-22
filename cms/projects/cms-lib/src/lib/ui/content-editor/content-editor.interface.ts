import { Observable } from 'rxjs';
import { ContentInfo } from '@cms-lib/neuxAPI/bean/ContentInfo';
import { TemplateGetResponse } from '@cms-lib/neuxAPI/bean/TemplateGetResponse';

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
