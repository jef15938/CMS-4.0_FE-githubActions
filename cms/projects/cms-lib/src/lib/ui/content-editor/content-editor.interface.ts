import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';

export class ContentEditorSaveEvent {
  contentInfo: ContentInfo;
  /** change Editor save status */
  editorSave: () => void;
}