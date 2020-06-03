import { Observable } from 'rxjs';

export interface IHtmlEditorAction {
  do(): Observable<any>;
}