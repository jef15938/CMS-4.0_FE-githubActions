import { DomCmdAction } from '../action.base';
import { HtmlEditorActionCategory } from '../action.enum';

export class Underline extends DomCmdAction {
  category = HtmlEditorActionCategory.FONT_STYLE;
  commandId = 'underline';
}
