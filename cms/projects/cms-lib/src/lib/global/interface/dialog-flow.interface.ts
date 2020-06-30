import { RichContentType } from '../enum';

export interface DialogFlowEvent {
  languageCode: string;
  name: string;
  parameters: { [key: string]: any };
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
