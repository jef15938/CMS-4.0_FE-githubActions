import { OnInit } from '@angular/core';
import { RichContent, DialogFlowMessengerService } from '@cms-lib/cms/service';
import { CustomModalBase, CustomModalActionButton, ModalService } from '@cms-lib/ui/modal';

export abstract class RichContentModalComponent<TContent extends RichContent> extends CustomModalBase implements OnInit {
  abstract title: string;
  actions: CustomModalActionButton[] = [];

  content: RichContent;

  contentModel: TContent;
  abstract createNewModel(): TContent;

  constructor(
    protected modalService: ModalService,
    protected dialogFlowMessengerService: DialogFlowMessengerService,
  ) { super(); }

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
