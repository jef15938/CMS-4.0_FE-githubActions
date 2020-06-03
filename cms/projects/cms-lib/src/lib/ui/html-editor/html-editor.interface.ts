import { Observable, Subject } from 'rxjs';

export interface IHtmlEditorContext {
  selectedChange$: Subject<HTMLElement>;
  getSelected(): HTMLElement;
}

export interface IHtmlEditorService {
  openEditor(
    config?: { title?: string, content?: string, }
  ): Observable<any>
}
