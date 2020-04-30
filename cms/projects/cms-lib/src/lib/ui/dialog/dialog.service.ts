import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogCustomWrapperComponent } from './dialog-custom-wrapper/dialog-custom-wrapper.component';
import { DialogOpenComponentConfig } from './dialog.interface';
import { CustomDialogBase } from './custom-dialog-base';

@Injectable()
export class DialogService {

  constructor(
    private _matDialog: MatDialog,
  ) {

  }

  openComponent<TComponent extends CustomDialogBase>(config: DialogOpenComponentConfig) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    // dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    dialogConfig.data = config;
    const modalDialog = this._matDialog.open(DialogCustomWrapperComponent, dialogConfig);
    return modalDialog.afterClosed();
  }

}