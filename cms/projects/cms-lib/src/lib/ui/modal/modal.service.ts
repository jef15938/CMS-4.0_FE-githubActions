import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalCustomWrapperComponent } from './modal-custom-wrapper/modal-custom-wrapper.component';
import { ModalOpenComponentConfig } from './modal.interface';
import { CustomModalBase } from './custom-modal-base';
import { ConfirmModalComponent } from './component/confirm-modal/confirm-modal.component';
import { MessageModalComponent } from './component/message-modal/message-modal.component';

let modalId = 0;

@Injectable()
export class ModalService {

  constructor(
    private matDialog: MatDialog,
  ) {

  }

  openComponent<TComponent extends CustomModalBase>(
    config: ModalOpenComponentConfig<TComponent>,
    fullScreen = false,
  ) {
    const modalConfig = new MatDialogConfig();
    // The user can't close the modal by clicking outside its body
    // modalConfig.disableClose = true;

    modalConfig.id = config.modalSetting?.id || `cms-modal-${++modalId}`;
    modalConfig.width = fullScreen ? '100%' : config.modalSetting?.width || '600px';
    modalConfig.height = fullScreen ? '100%' : config.modalSetting?.height || modalConfig.height;
    modalConfig.minWidth = fullScreen ? '100%' : config.modalSetting?.minWidth || modalConfig.minWidth;
    modalConfig.minHeight = fullScreen ? '100%' : config.modalSetting?.minHeight || modalConfig.minHeight;
    modalConfig.maxWidth = fullScreen ? '100%' : config.modalSetting?.maxWidth || modalConfig.maxWidth;
    modalConfig.maxHeight = fullScreen ? '100%' : config.modalSetting?.maxHeight || modalConfig.maxHeight;

    // https://material.angular.io/components/modal/overview

    modalConfig.data = config;
    const modalModal = this.matDialog.open(ModalCustomWrapperComponent, modalConfig);
    return modalModal.afterClosed();
  }

  openMessage(componentInitData: { message: string, title?: string }) {
    return this.openComponent({
      component: MessageModalComponent,
      componentInitData
    });
  }

  openConfirm(componentInitData?: { message?: string, title?: string }) {
    return this.openComponent({
      component: ConfirmModalComponent,
      componentInitData
    });
  }

}