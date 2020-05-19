import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';

export enum EditorMode {
  EDIT, INFO, READ,
}

export class ContentEditorSaveEvent {
  contentInfo: ContentInfo;
  /** change Editor save status */
  editorSave: () => void;
}