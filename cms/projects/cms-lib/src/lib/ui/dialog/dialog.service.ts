import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogCustomWrapperComponent } from './dialog-custom-wrapper/dialog-custom-wrapper.component';
import { DialogOpenComponentConfig } from './dialog.interface';
import { CustomDialogBase } from './custom-dialog-base';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { MessageDialogComponent } from './component/message-dialog/message-dialog.component';

@Injectable()
export class DialogService {

  constructor(
    private _matDialog: MatDialog,
  ) {

  }

  openComponent<TComponent extends CustomDialogBase>(config: DialogOpenComponentConfig<TComponent>) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    // dialogConfig.disableClose = true;

    dialogConfig.id = config.dialogSetting?.id || 'modal-component';
    dialogConfig.width = config.dialogSetting?.width || '600px';
    dialogConfig.height = config.dialogSetting?.height || dialogConfig.height;
    dialogConfig.minWidth = config.dialogSetting?.minWidth || dialogConfig.minWidth;
    dialogConfig.minHeight = config.dialogSetting?.minHeight || dialogConfig.minHeight;
    dialogConfig.maxWidth = config.dialogSetting?.maxWidth || dialogConfig.maxWidth;
    dialogConfig.maxHeight = config.dialogSetting?.maxHeight || dialogConfig.maxHeight;

    // https://material.angular.io/components/dialog/overview

    dialogConfig.data = config;
    const modalDialog = this._matDialog.open(DialogCustomWrapperComponent, dialogConfig);
    return modalDialog.afterClosed();
  }

  openMessage(componentInitData: { message: string, title?: string }) {
    return this.openComponent({
      component: MessageDialogComponent,
      componentInitData
    });
  }

  openConfirm(componentInitData?: { message?: string, title?: string }) {
    return this.openComponent({
      component: ConfirmDialogComponent,
      componentInitData
    });
  }

}