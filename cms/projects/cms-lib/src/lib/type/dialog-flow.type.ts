export interface DialogFlowEvent {
  languageCode: string;
  name: string;
  parameters: { [key: string]: any };
}

export enum RichContentType {
  INFO = 'info',
  DESCRIPTION = 'description',
  IMAGE = 'image',
  BUTTON = 'button',
  LIST = 'list',
  ACCORDION = 'accordion',
  CHIPS = 'chips',
}

export interface RichContent {
  type: RichContentType;
}

export interface DialogFlowMessenger extends HTMLElement {
  renderCustomText(message: string): void;
  renderCustomCard(richContents: RichContent[]);
  showMinChat(): void;
  showChat_(): void;
  hideChat_(): void;
}
