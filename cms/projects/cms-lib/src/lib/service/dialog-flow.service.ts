import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DialogFlowMessenger, DialogFlowEvent, RichContent } from './../type';

@Injectable({
  providedIn: 'root'
})
export class DialogFlowMessengerService {
  private dfMessenger: DialogFlowMessenger;

  constructor(
    private router: Router,
  ) {
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
            alert(`[功能測試] ${eventContent.name} : ${eventContent.parameters ? JSON.stringify(eventContent.parameters) : ''}`);
          } else {
            // TODO: handle event
            const funcId = eventContent.parameters?.funcId;
            switch (funcId) {
              case 'test':
                alert('CMS 執行功能測試');
                break;
              case 'routing':
                const path: string = eventContent.parameters.funcParams?.url;
                if (!path) { alert('執行路由功能失敗(無路由url)'); }
                const notValid = ['http', '//', '.'];
                const isValid = notValid.every(words => path.indexOf(words) < 0);
                if (!isValid) { alert(`執行路由功能失敗(無效路由) : ${path}`); }
                const pathFragments = path.split('/');
                this.router.navigate(pathFragments);
                break;
            }
          }
        })
      ).subscribe();
    }
  }

  private hasMessenger() {
    this.registerMessenger();
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

  parseRichContent(contentString: string): { textContent: string, richContents: RichContent[] } {
    const content = {
      textContent: '',
      richContents: [],
    } as { textContent: string, richContents: RichContent[] };

    if (content) {
      try {
        const parsed: any[] = JSON.parse(contentString);

        try {
          const textItem = parsed.find(item => !!item.text) as { text: { text: string[] } };
          if (textItem?.text?.text) {
            content.textContent = textItem.text.text[0] || '';
          }
        } catch (error) {

        }

        try {
          const payloadItem = parsed.find(item => !!item.payload) as { payload: { richContent: (RichContent[])[] } };
          if (payloadItem?.payload?.richContent) {
            const richContents = payloadItem.payload.richContent[0];
            if (richContents) {
              content.richContents = richContents;
            }
          }
        } catch (error) {

        }
      } catch (error) {

      }
    }
    return content;
  }

}
