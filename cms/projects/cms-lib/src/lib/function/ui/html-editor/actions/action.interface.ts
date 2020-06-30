import { Observable } from 'rxjs';

export interface HtmlEditorAction {
  do(): Observable<any>;
}
