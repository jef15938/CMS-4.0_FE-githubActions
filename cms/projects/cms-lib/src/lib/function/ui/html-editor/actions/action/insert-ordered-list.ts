import { DomCmdAction } from '../action.base';
import { HtmlEditorActionCategory } from '../action.enum';

export class InsertOrderedList extends DomCmdAction {
  category = HtmlEditorActionCategory.LIST;
  commandId = 'insertOrderedList';
}
