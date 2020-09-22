import { MatDialogRef } from '@angular/material/dialog';

export interface CustomModalActionButton {
  text: string;
  class?: string;
  onClick: (ev?: any) => void;
}

export abstract class CustomModalBase<C, R> {

  abstract title: null | string | (() => string);
  abstract actions: CustomModalActionButton[];

  modalRef: MatDialogRef<C, R>;

  constructor() {

  }

  updateSize(width?: string, height?: string) {
    this.modalRef.updateSize(width, height);
  }

  close(result?: R) {
    this.modalRef.close(result);
  }
}

