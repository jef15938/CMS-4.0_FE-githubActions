import { Injectable } from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { tap } from 'rxjs/operators';

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

interface DialogFlowMessenger extends HTMLElement {
  renderCustomText(message: string): void;
  renderCustomCard(richContents: RichContent[]);
  showMinChat(): void;
  showChat_(): void;
  hideChat_(): void;
}

@Injectable({
  providedIn: 'root'
})
export class DialogFlowMessengerService {
  private dfMessenger: DialogFlowMessenger;

  constructor() {
    this.registerMessenger();
  }

  private registerMessenger() {
    if (!!this.dfMessenger) { return; }
    this.dfMessenger = document.querySelector('df-messenger') as any;
    if (!!this.dfMessenger) {
      const buttonEvent$ = fromEvent(this.dfMessenger, 'df-button-clicked');
      const listEvent$ = fromEvent(this.dfMessenger, 'df-list-element-clicked');
      merge(
        buttonEvent$,
        listEvent$
      ).pipe(
        tap((ev: any) => {
          const eventType = ev.type;
          const eventDetail = ev?.detail;
          const eventElement = eventDetail?.element;
          const eventContent = eventElement?.event as DialogFlowEvent;

          if (eventType === 'df-button-clicked' && eventElement) {
            const aTag = (eventElement as HTMLElement)?.shadowRoot?.querySelector('a');
            if (aTag && !aTag.getAttribute('href')) {
              aTag.removeAttribute('href');
            }
          }

          if (!eventContent) { return; }

          console.log('DialogFlow event received, event = ', eventContent);
          if (eventContent.name !== 'ExecCmsFuncEvent') {
            alert(`[功能測試] ${eventContent.name}`);
          } else {
            // TODO: handle event
            alert('執行CMS功能');
          }
        })
      ).subscribe();
    }
  }

  private hasMessenger() {
    this.registerMessenger;
    return !!this.dfMessenger;
  }

  showChat() {
    if (!this.hasMessenger()) { return; }
    this.dfMessenger.showChat_();
  }

  renderCustomText(text: string) {
    if (!this.hasMessenger()) { return; }
    this.dfMessenger.renderCustomText(text);
  }

  renderCustomCard(richContents: RichContent[]) {
    if (!this.hasMessenger()) { return; }
    this.dfMessenger.renderCustomCard(richContents);
  }

}