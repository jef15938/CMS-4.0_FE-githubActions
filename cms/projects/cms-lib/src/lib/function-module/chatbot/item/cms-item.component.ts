import { Component } from '@angular/core';
import { ItemComponent } from './item.component';
import { ModalService } from './../../../ui/modal';
import { CmsChatbotService } from '../cms-chatbot.service';

@Component({
  selector: 'cms-cms-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class CmsItemComponent extends ItemComponent {
  title = 'CMS 助手 > 項目設定';

  constructor(
    chatbotService: CmsChatbotService,
    modalService: ModalService,
  ) { super(chatbotService, modalService); }
}
