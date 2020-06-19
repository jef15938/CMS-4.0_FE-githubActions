import { Component, OnInit, Type } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from './../../../../../../ui/modal/custom-modal-base';
import { ChatbotService } from '../../../chatbot.service';
import { of } from 'rxjs';
import { ChatbotReply } from '../../../chatbot.model';
import { tap, map } from 'rxjs/operators';
import { RichContentType, RichContent, DialogFlowMessengerService } from './../../../../../service/dialog-flow.service';
import { ModalService } from './../../../../../../ui/modal/modal.service';
import { InfoContentModalComponent } from '../rich-content/info-content-modal/info-content-modal.component';
import { DescriptionContentModalComponent } from '../rich-content/description-content-modal/description-content-modal.component';
import { ImageContentModalComponent } from '../rich-content/image-content-modal/image-content-modal.component';
import { ButtonContentModalComponent } from '../rich-content/button-content-modal/button-content-modal.component';
import { ListContentModalComponent } from '../rich-content/list-content-modal/list-content-modal.component';
import { AccordionContentModalComponent } from '../rich-content/accordion-content-modal/accordion-content-modal.component';
import { ChipsContentModalComponent } from '../rich-content/chips-content-modal/chips-content-modal.component';
import { RichContentModalComponent } from '../rich-content/rich-content-modal-base';

class ReplyModel {
  id: number;
  name: string;
  content: string;

  textContent: string;
  richContents: RichContent[];

  initContent(contentString: string, dialogFlowMessengerService: DialogFlowMessengerService) {
    const content = dialogFlowMessengerService.parseRichContent(contentString)
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

  static replyToModel(reply: ChatbotReply, dialogFlowMessengerService: DialogFlowMessengerService): ReplyModel {
    const model = new ReplyModel();
    model.id = reply.id;
    model.name = reply.name;
    model.initContent(reply.content, dialogFlowMessengerService);
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
    private chatbotService: ChatbotService,
    private modalService: ModalService,
    private dialogFlowMessengerService: DialogFlowMessengerService,
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
      map(reply => Factory.replyToModel(reply, this.dialogFlowMessengerService)),
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
    this.dialogFlowMessengerService.showChat();
    this.dialogFlowMessengerService.renderCustomText('--------  預覽回覆開始  --------');
    if (this.replyModel?.textContent) {
      this.dialogFlowMessengerService.renderCustomText(this.replyModel.textContent);
    }
    if (this.replyModel?.richContents?.length) {
      this.dialogFlowMessengerService.renderCustomCard(this.replyModel.richContents);
    }
    this.dialogFlowMessengerService.renderCustomText('--------  預覽回覆結束  --------');
  }

  addRichContent(type: RichContentType) {
    this.createEditContent(type).subscribe();
  }

  editRichContent(richContent: RichContent) {
    this.createEditContent(richContent.type, richContent).subscribe();
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

  private createEditContent(type: RichContentType, content?: RichContent) {
    let component: Type<RichContentModalComponent<any>>;
    switch (type) {
      case RichContentType.INFO:
        component = InfoContentModalComponent;
        break;
      case RichContentType.DESCRIPTION:
        component = DescriptionContentModalComponent;
        break;
      case RichContentType.IMAGE:
        component = ImageContentModalComponent;
        break;
      case RichContentType.BUTTON:
        component = ButtonContentModalComponent;
        break;
      case RichContentType.LIST:
        component = ListContentModalComponent;
        break;
      case RichContentType.ACCORDION:
        component = AccordionContentModalComponent;
        break;
      // case RichContentType.CHIPS:
      //   component = ChipsContentModalComponent;
      //   break;
    }
    return component ? this.modalService.openComponent({
      component,
      componentInitData: {
        content
      },
    }).pipe(
      tap((res: RichContent) => {
        if (res) {
          const index = this.replyModel.richContents.indexOf(content);
          if (index < 0) { // add
            this.replyModel.richContents.push(res);
          } else { // edit
            this.replyModel.richContents.splice(index, 1, res);
          }
        }
      })
    ) : of(undefined);
  }

}
