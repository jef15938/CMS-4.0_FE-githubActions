import { Component } from '@angular/core';
import { ModalService } from '../../../ui/modal';
import { ReplyComponent } from './reply.component';
import { CmsChatbotService } from '../cms-chatbot.service';

@Component({
  selector: 'cms-cms-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class CmsReplyComponent extends ReplyComponent {

  title = 'CMS 助手 > 回覆設定';

  constructor(
    chatbotService: CmsChatbotService,
    modalService: ModalService,
  ) { super(chatbotService, modalService); }

}
