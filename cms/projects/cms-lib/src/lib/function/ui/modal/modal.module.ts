import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { PipeModule } from './../../../global/pipe';
import { ModalCustomWrapperComponent } from './modal-custom-wrapper/modal-custom-wrapper.component';
import { MessageModalComponent } from './component/message-modal/message-modal.component';
import { ConfirmModalComponent } from './component/confirm-modal/confirm-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { DynamicWrapperModule } from '@neux/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ModalCustomWrapperComponent,
    MessageModalComponent,
    ConfirmModalComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    PipeModule,
    DynamicWrapperModule,
  ],
  exports: [
    MatDialogModule,
  ],
})
export class ModalModule {
}
