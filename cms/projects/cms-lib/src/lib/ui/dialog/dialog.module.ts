import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from './dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogCustomWrapperDirective } from './dialog-custom-wrapper/dialog-custom-wrapper.directive';
import { DialogCustomWrapperComponent } from './dialog-custom-wrapper/dialog-custom-wrapper.component';
import { MessageDialogComponent } from './component/message-dialog/message-dialog.component';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { PipeModule } from '../../pipe/pipe.module';

@NgModule({
  declarations: [
    DialogCustomWrapperDirective,
    DialogCustomWrapperComponent,
    MessageDialogComponent,
    ConfirmDialogComponent,
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
export class DialogModule {
  static forRoot(providers = []): ModuleWithProviders {
    return {
      ngModule: DialogModule,
      providers: [
        ...providers,
        DialogService,
      ]
    };
  }
}
