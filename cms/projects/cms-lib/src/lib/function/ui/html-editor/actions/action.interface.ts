import { Observable } from 'rxjs';
import { HtmlEditorActionCategory } from './action.enum';

export interface HtmlEditorAction {
  category: HtmlEditorActionCategory;
  do(): Observable<any>;
}
