import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { PipeModule } from '@cms-lib/pipe';
import { ModalCustomWrapperDirective } from './modal-custom-wrapper/modal-custom-wrapper.directive';
import { ModalCustomWrapperComponent } from './modal-custom-wrapper/modal-custom-wrapper.component';
import { MessageModalComponent } from './component/message-modal/message-modal.component';
import { ConfirmModalComponent } from './component/confirm-modal/confirm-modal.component';


@NgModule({
  declarations: [
    ModalCustomWrapperDirective,
    ModalCustomWrapperComponent,
    MessageModalComponent,
    ConfirmModalComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    PipeModule,
  ],
  exports: [
    MatDialogModule,
  ],
})
export class ModalModule {
}
