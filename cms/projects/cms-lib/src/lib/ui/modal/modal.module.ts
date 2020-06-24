import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { PipeModule } from './../../pipe';
import { ModalCustomWrapperDirective } from './modal-custom-wrapper/modal-custom-wrapper.directive';
import { ModalCustomWrapperComponent } from './modal-custom-wrapper/modal-custom-wrapper.component';
import { MessageModalComponent } from './component/message-modal/message-modal.component';
import { ConfirmModalComponent } from './component/confirm-modal/confirm-modal.component';
import { MatButtonModule } from '@angular/material/button';


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
    MatButtonModule,
    PipeModule,
  ],
  exports: [
    MatDialogModule,
  ],
})
export class ModalModule {
}
