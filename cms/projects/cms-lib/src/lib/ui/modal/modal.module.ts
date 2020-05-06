import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalCustomWrapperDirective } from './modal-custom-wrapper/modal-custom-wrapper.directive';
import { ModalCustomWrapperComponent } from './modal-custom-wrapper/modal-custom-wrapper.component';
import { MessageModalComponent } from './component/message-modal/message-modal.component';
import { ConfirmModalComponent } from './component/confirm-modal/confirm-modal.component';
import { PipeModule } from '../../pipe/pipe.module';

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
  static forRoot(providers = []): ModuleWithProviders {
    return {
      ngModule: ModalModule,
      providers: [
        ...providers,
        ModalService,
      ]
    };
  }
}
