
import { DomCmdAction } from '../action.base';
import { HtmlEditorActionCategory } from '../action.enum';

export class JustifyRight extends DomCmdAction {
  category = HtmlEditorActionCategory.FONT_POSITON;
  commandId = 'justifyRight';
}
