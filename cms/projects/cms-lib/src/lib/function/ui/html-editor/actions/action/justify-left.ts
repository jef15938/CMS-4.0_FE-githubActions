import { DomCmdAction } from '../action.base';
import { HtmlEditorActionCategory } from '../action.enum';

export class JustifyLeft extends DomCmdAction {
  category = HtmlEditorActionCategory.FONT_POSITON;
  commandId = 'justifyLeft';
}
