import { DomCmdAction } from '../action.base';
import { HtmlEditorActionCategory } from '../action.enum';

export class JustifyCenter extends DomCmdAction {
  category = HtmlEditorActionCategory.FONT_POSITON;
  commandId = 'justifyCenter';
}
