import { Observable, Subject } from 'rxjs';
import { ModalService } from './../modal/modal.service';
import { SimpleWysiwygService } from './service/simple-wysiwyg.service';
import { ElementRef } from '@angular/core';

export interface IHtmlEditorContext {
  editorContainer: ElementRef<HTMLDivElement>;
  selectedChange$: Subject<HTMLElement>;
  simpleWysiwygService: SimpleWysiwygService;
  modalService: ModalService;
  getSelected(): HTMLElement;
  checkSelected(): void;
}

export interface IHtmlEditorService {
  openEditor(
    config?: { title?: string, content?: string, }
  ): Observable<any>
}
