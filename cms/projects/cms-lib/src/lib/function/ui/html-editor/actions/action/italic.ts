import { DomCmdAction } from '../action.base';
import { HtmlEditorActionCategory } from '../action.enum';

export class Italic extends DomCmdAction {
  category = HtmlEditorActionCategory.FONT_STYLE;
  commandId = 'italic';
}
