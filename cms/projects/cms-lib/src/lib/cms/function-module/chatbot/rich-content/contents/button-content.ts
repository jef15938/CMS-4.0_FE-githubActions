import { RichContent, RichContentType } from '../rich-content.type';

export class ButtonContent implements RichContent {
  type = RichContentType.BUTTON;
  icon: {
    type: string;
    color: string;
  }
  text: string;
  link: string;
  // event: {
    
  // }
}