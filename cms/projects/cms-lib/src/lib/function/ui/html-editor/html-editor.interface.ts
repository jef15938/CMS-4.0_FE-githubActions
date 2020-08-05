import { MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs';
import { ModalService } from '../modal';
import { SimpleWysiwygService } from './service/simple-wysiwyg.service';
import { HtmlEditorAction } from './actions/action.interface';
import { Injector } from '@angular/core';
import { CmsEnviroment } from '../../../global/interface';

export interface HtmlEditorContext {
  injector: Injector;
  environment: CmsEnviroment;
  simpleWysiwygService: SimpleWysiwygService;
  modalService: ModalService;
  editorContainer: HTMLDivElement;
  commonAncestorContainer: Node;
  isSelectionInsideEditorContainer: boolean;
  doAction(action: HtmlEditorAction): void;
  checkInnerHtml(): void;
}

export interface HtmlEditorContextMenuItem {
  text: string;
  icon?: string;
  action?: HtmlEditorAction;
  children?: HtmlEditorContextMenuItem[];
  disabled?: boolean;
}

export interface HtmlEditorContextMenuItem {
  type?: 'select';
  defaultValue?: any;
  selectionOptions?: { text: string, value: any, disabled?: boolean }[];
  selectionChange?: (ev: { source: MatSelect, value: any }) => void;
}

export interface HtmlEditorServiceInterface {
  openEditor(
    config?: { title?: string, content?: string, }
  ): Observable<any>;
}
