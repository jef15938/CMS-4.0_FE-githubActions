import { MatDialogRef } from '@angular/material/dialog';

export interface CustomDialogActionButton {
  text: string;
  class?: string;
  onClick: (ev?: any) => void;
}

export abstract class CustomDialogBase {

  abstract title: null | string | (() => string);
  abstract actions: CustomDialogActionButton[];

  dialogRef: MatDialogRef<any>;

  constructor() {

  }

  close(result?: any) {
    this.dialogRef.close(result);
  }
}