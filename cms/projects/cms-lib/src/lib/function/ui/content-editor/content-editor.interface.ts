import { Observable } from 'rxjs';
import { ContentInfo } from './../../../global/api/neuxAPI/bean/ContentInfo';

export enum EditorMode {
  EDIT, INFO, READ,
}

export enum ContentEditorActionMode {
  LAYOUT = 'LAYOUT',
  TEMPLATE = 'TEMPLATE',
}

export interface ContentEditorConfig {
  onSaved?: () => void;
}

export class ContentEditorSaveEvent {
  contentInfo: ContentInfo;
  /** change Editor save status */
  editorSave: () => void;
}
