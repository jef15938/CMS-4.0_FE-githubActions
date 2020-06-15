import { Observable } from 'rxjs';
import { ModalService } from './../modal/modal.service';
import { SimpleWysiwygService } from './service/simple-wysiwyg.service';
import { IHtmlEditorAction } from './actions/action.interface';
import { MatSelect } from '@angular/material/select';

export interface IHtmlEditorContext {
  simpleWysiwygService: SimpleWysiwygService;
  modalService: ModalService;
  editorContainer: HTMLDivElement;
  commonAncestorContainer: Node;
  isSelectionInsideEditorContainer: boolean;
  doAction(action: IHtmlEditorAction): void;
  checkInnerHtml(): void;
}

export interface IHtmlEditorContextMenuItem {
  text: string,
  icon?: string,
  action?: IHtmlEditorAction,
  children?: IHtmlEditorContextMenuItem[]
  disabled?: boolean;
}

export interface IHtmlEditorContextMenuItem {
  type?: 'select';
  defaultValue?: any;
  selectionOptions?: { text: string, value: any, disabled?: boolean }[];
  selectionChange?: (ev: { source: MatSelect, value: any }) => void;
}

export interface IHtmlEditorService {
  openEditor(
    config?: { title?: string, content?: string, }
  ): Observable<any>
}
