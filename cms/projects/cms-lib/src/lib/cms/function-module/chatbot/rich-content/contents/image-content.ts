import { RichContent, RichContentType } from '../rich-content.type';

export class ImageContent implements RichContent {
  type = RichContentType.IMAGE;
  rawUrl: string;
  accessibilityText: string;
}