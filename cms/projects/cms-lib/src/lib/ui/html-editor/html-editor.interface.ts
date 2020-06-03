import { Observable, Subject } from 'rxjs';
import { SelecitonRangeService } from './service/selection-range-service';
import { ModalService } from './../modal/modal.service';

export interface IHtmlEditorContext {
  selectedChange$: Subject<HTMLElement>;
  getSelected(): HTMLElement;
  selecitonRangeService: SelecitonRangeService;
  modalService: ModalService;
}

export interface IHtmlEditorService {
  openEditor(
    config?: { title?: string, content?: string, }
  ): Observable<any>
}
