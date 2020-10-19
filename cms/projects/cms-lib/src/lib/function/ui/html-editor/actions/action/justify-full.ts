import { DomCmdAction } from '../action.base';
import { HtmlEditorActionCategory } from '../action.enum';

export class JustifyFull extends DomCmdAction {
  category = HtmlEditorActionCategory.FONT_POSITON;
  commandId = 'justifyFull';
}
