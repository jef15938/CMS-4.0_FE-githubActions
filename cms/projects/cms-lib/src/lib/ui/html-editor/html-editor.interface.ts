import { Observable } from 'rxjs';
import { ModalService } from './../modal/modal.service';
import { SimpleWysiwygService } from './service/simple-wysiwyg.service';
import { IHtmlEditorAction } from './actions/action.interface';

export interface IHtmlEditorContext {
  simpleWysiwygService: SimpleWysiwygService;
  modalService: ModalService;
  editorContainer: HTMLDivElement;
  commonAncestorContainer: Node;
  isSelectionInsideEditorContainer: boolean;
  doAction(action: IHtmlEditorAction): void;
}

export interface IHtmlEditorContextMenuItem {
  text: string,
  icon?: string,
  action?: IHtmlEditorAction,
  children?: IHtmlEditorContextMenuItem[]
  disabled?: boolean;
}

export interface IHtmlEditorService {
  openEditor(
    config?: { title?: string, content?: string, }
  ): Observable<any>
}
