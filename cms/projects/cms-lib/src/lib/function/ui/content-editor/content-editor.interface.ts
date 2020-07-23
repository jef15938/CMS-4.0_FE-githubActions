import { Observable } from 'rxjs';
import { ContentInfo } from './../../../global/api/neuxAPI/bean/ContentInfo';
import { TemplateGetResponse } from './../../../global/api/neuxAPI/bean/TemplateGetResponse';

export enum EditorMode {
  EDIT, INFO, READ,
}

export enum ContentEditorActionMode {
  LAYOUT, TEMPLATE
}

export interface ContentEditorServiceConfig {
  contentID: string;
  contentInfo: ContentInfo;
  editorMode: EditorMode;
  selectableTemplates: TemplateGetResponse;
  onSaved?: () => void;
}

export interface ContentEditorServiceInterface {
  openEditor(config: ContentEditorServiceConfig): Observable<any>;
}

export class ContentEditorSaveEvent {
  contentInfo: ContentInfo;
  /** change Editor save status */
  editorSave: () => void;
}
