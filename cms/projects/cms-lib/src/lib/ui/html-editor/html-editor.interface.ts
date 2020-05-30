import { Observable } from 'rxjs';

export interface IHtmlEditorService {
  openEditor(
    config?: { title?: string, content?: string, }
  ): Observable<any>
}
