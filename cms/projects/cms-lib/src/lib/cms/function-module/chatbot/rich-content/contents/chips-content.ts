import { RichContent, RichContentType } from '../rich-content.type';

export class ChipsContent implements RichContent {
  type = RichContentType.CHIPS;
  options: {
    text: string;
    image: {
      src: {
        rawUrl: string;
      }
    }
  }[];
}