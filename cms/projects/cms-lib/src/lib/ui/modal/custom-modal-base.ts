import { MatDialogRef } from '@angular/material/dialog';

export interface CustomModalActionButton {
  text: string;
  class?: string;
  onClick: (ev?: any) => void;
}

export abstract class CustomModalBase {

  abstract title: null | string | (() => string);
  abstract actions: CustomModalActionButton[];

  modalRef: MatDialogRef<any>;

  constructor() {

  }

  close(result?: any) {
    this.modalRef.close(result);
  }
}