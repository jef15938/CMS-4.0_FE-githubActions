import { RichContent } from '../../../service/dialog-flow.service';


export class ContentFactory {

  static parseContent(contentString: string): { textContent: string, richContents: RichContent[] } {
    const content = {
      textContent: '',
      richContents: [],
    } as { textContent: string, richContents: RichContent[] };

    if (content) {
      try {
        let parsed: any[] = JSON.parse(contentString);

        try {
          const textItem = parsed.find(item => !!item.text) as { text: { text: string[] } };
          if (textItem?.text?.text) {
            content.textContent = textItem.text.text[0] || '';
          }
        } catch (error) {

        }

        try {
          const payloadItem = parsed.find(item => !!item.payload) as { payload: { richContent: (RichContent[])[] } }
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