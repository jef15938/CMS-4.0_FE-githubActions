import { RichContent, RichContentType } from '../rich-content.type';

export class InfoContent implements RichContent {
  type = RichContentType.INFO;
  title: string;
  subtitle: string;
  image: {
    src: {
      rawUrl: string;
    }
  };
  actionLink: string;
}