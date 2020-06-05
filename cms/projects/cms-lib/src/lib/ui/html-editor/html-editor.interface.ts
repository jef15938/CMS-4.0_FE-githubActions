import { Observable } from 'rxjs';
import { ModalService } from './../modal/modal.service';
import { SimpleWysiwygService } from './service/simple-wysiwyg.service';

export interface IHtmlEditorContext {
  simpleWysiwygService: SimpleWysiwygService;
  modalService: ModalService;
  editorContainer: HTMLDivElement;
  commonAncestorContainer: Node;
  isSelectionInsideEditorContainer: boolean;
}

export interface IHtmlEditorService {
  openEditor(
    config?: { title?: string, content?: string, }
  ): Observable<any>
}
