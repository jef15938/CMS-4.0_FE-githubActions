import { Component, OnInit } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from './../../../../../../ui/modal/custom-modal-base';
import { ChatbotService } from '../../../chatbot.service';
import { of } from 'rxjs';
import { ChatbotReply } from '../../../chatbot.model';
import { tap, map } from 'rxjs/operators';
import { RichContent, RichContentType } from '../../../rich-content/rich-content.type';
import { ContentFactory } from '../../../rich-content/rich-content.factory';

class ReplyModel {
  id: number;
  name: string;
  content: string;

  textContent: string;
  richContents: RichContent[];

  initContent(contentString: string) {
    const content = ContentFactory.parseContent(contentString)
    this.textContent = content.textContent;
    this.richContents = content.richContents;
  }

  getContent(): string {
    const content = [];

    const textContent = (this.textContent || '').trim();
    if (textContent) {
      content.push({
        text: {
          text: [textContent]
        }
      });
    }

    const richContents = this.richContents;
    if (richContents?.length) {
      content.push({
        payload: {
          richContent: [richContents]
        }
      });
    }

    console.warn('getContent()', this, content);
    return JSON.stringify(content);
  }
}

class Factory {

  static createNewReply() {
    const reply = new ChatbotReply();
    reply.id = 0;
    reply.name = ''
    reply.content = '';
    return reply;
  }

  static replyToModel(reply: ChatbotReply): ReplyModel {
    const model = new ReplyModel();
    model.id = reply.id;
    model.name = reply.name;
    model.initContent(reply.content);
    return model;
  }

  static modelToReply(model: ReplyModel): ChatbotReply {
    const reply = new ChatbotReply();
    reply.id = model.id;
    reply.name = model.name;
    reply.content = model.getContent();
    return reply;
  }
}

@Component({
  selector: 'cms-create-edit-reply-modal',
  templateUrl: './create-edit-reply-modal.component.html',
  styleUrls: ['./create-edit-reply-modal.component.scss']
})
export class CreateEditReplyModalComponent extends CustomModalBase implements OnInit {

  title: string | (() => string) = () => `${this.action === 'Create' ? '新增' : '修改'}回覆`;
  actions: CustomModalActionButton[] = [];

  RichContentType = RichContentType;

  action: 'Create' | 'Update' = 'Create';

  replyId: number;

  replyModel: ReplyModel;

  constructor(
    private chatbotService: ChatbotService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getReply().subscribe();
  }

  getReply() {
    return (
      this.action === 'Create'
        ? of(Factory.createNewReply())
        : this.chatbotService.getReplyById(this.replyId)
    ).pipe(
      map(reply => Factory.replyToModel(reply)),
      tap(replyModel => this.replyModel = replyModel),
    );
  }

  private save() {
    const reply = Factory.modelToReply(this.replyModel);
    console.warn('save() reply = ', reply);
    return (
      this.action === 'Create'
        ? this.chatbotService.createReply(reply)
        : this.chatbotService.updateReply(reply)
    );
  }

  confirm() {
    this.save().subscribe(_ => {
      this.close('Confirm');
    });
  }

  preview() {
    const reply = Factory.modelToReply(this.replyModel);
    console.warn('preview() reply = ', reply);
    let dfMessenger: {
      renderCustomText(message: string): void;
      renderCustomCard(richContents: RichContent[]);
      showMinChat(): void;
      showChat_(): void;
      hideChat_(): void;
    };
    dfMessenger = document.querySelector('df-messenger') as any;
    if (dfMessenger) {
      dfMessenger.showChat_();
      dfMessenger.renderCustomText('--------  回覆預覽開始  --------');
      if (this.replyModel?.textContent) {
        dfMessenger.renderCustomText(this.replyModel.textContent);
      }
      if (this.replyModel?.richContents?.length) {
        dfMessenger.renderCustomCard(this.replyModel.richContents);
      }
      dfMessenger.renderCustomText('--------  回覆預覽結束  --------');
    }
  }

  addRichContent() {
    // const synonym = (this.synonym || '').trim();
    // if (!synonym) { return; }
    // if (this.item.synonyms.indexOf(synonym) < 0) {
    //   this.item.synonyms.unshift(synonym);
    //   document.getElementById('synonym-list').scrollTo(0, 0);
    // } else {
    //   alert('已有同樣的同義祠');
    // }
    // this.synonym = '';
  }

  removeRichContent(richContent: RichContent) {
    if (!richContent) { return; }
    const index = this.replyModel.richContents.indexOf(richContent);
    if (index > -1) {
      this.replyModel.richContents.splice(index, 1);
    }
  }

  private arrayMove(arr: any[], beforeIndex: number, afterIndex: number) {
    if (afterIndex >= arr.length) {
      var k = afterIndex - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(afterIndex, 0, arr.splice(beforeIndex, 1)[0]);
    return arr; // for testing
  };

  onListDropped(ev: { currentIndex: number, previousIndex: number }): void {
    const beforeIndex = ev.previousIndex;
    const afterIndex = ev.currentIndex;
    if (beforeIndex === afterIndex) { return; }
    this.arrayMove(this.replyModel.richContents, beforeIndex, afterIndex);
  }

}
