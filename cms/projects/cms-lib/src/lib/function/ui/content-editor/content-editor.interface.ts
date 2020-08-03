import { Observable } from 'rxjs';
import { ContentInfo } from './../../../global/api/neuxAPI/bean/ContentInfo';

export enum EditorMode {
  EDIT, INFO, READ,
}

export enum ContentEditorActionMode {
  LAYOUT = 'LAYOUT',
  TEMPLATE = 'TEMPLATE',
}

export interface ContentEditorServiceConfig {
  title?: string;
  controlID: string;
  contentID: string;
  content?: ContentInfo;
  editorMode: EditorMode;
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
