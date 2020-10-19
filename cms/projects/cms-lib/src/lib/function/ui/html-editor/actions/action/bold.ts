import { DomCmdAction } from '../action.base';
import { HtmlEditorActionCategory } from '../action.enum';

export class Bold extends DomCmdAction {
  category = HtmlEditorActionCategory.FONT_STYLE;
  commandId = 'bold';
}
