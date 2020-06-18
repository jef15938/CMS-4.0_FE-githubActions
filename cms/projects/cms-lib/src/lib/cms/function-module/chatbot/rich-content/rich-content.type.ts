export enum RichContentType {
  IMAGE = 'image',
  INFO = 'info',
  BUTTON = 'button',
  CHIPS = 'chips',
}

export interface RichContent {
  type: RichContentType;
}
