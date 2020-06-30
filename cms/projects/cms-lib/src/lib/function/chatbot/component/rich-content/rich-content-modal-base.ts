import { OnInit, Injector, Directive } from '@angular/core';
import { DialogFlowMessengerService } from '../../../../global/service';
import { RichContent } from '../../../../global/interface';
import { CustomModalBase, CustomModalActionButton, ModalService } from '../../../ui/modal';
import { ChatbotService } from '../../service/chatbot.service';

@Directive()
export abstract class RichContentModalComponent<TContent extends RichContent> extends CustomModalBase implements OnInit {
  abstract title: string;
  actions: CustomModalActionButton[] = [];

  content: RichContent;
  chatbotService: ChatbotService;
  modalService: ModalService;
  dialogFlowMessengerService: DialogFlowMessengerService;

  contentModel: TContent;
  abstract createNewModel(): TContent;

  constructor(
    protected injector: Injector,
  ) {
    super();
    this.modalService = this.injector.get(ModalService);
    this.dialogFlowMessengerService = this.injector.get(DialogFlowMessengerService);
  }

  ngOnInit(): void {
    const model: TContent = (this.content as TContent) || this.createNewModel();
    this.contentModel = model;
  }

  confirm() {
    const content = JSON.parse(JSON.stringify(this.contentModel));
    this.close(content);
  }

  preview() {
    this.dialogFlowMessengerService.renderCustomText('--------  預覽內容開始  --------');
    this.dialogFlowMessengerService.renderCustomCard([this.contentModel]);
    this.dialogFlowMessengerService.renderCustomText('--------  預覽內容結束  --------');
  }
}
