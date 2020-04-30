import { MatDialogRef } from '@angular/material/dialog';

export abstract class CustomDialogBase {

  dialogRef: MatDialogRef<any>;

  constructor() {

  }

  close(result?: any) {
    this.dialogRef.close(result);
  }
}