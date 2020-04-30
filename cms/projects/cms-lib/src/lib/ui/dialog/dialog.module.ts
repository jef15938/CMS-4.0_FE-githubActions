import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from './dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogCustomWrapperDirective } from './dialog-custom-wrapper/dialog-custom-wrapper.directive';
import { DialogCustomWrapperComponent } from './dialog-custom-wrapper/dialog-custom-wrapper.component';

@NgModule({
  declarations: [
    DialogCustomWrapperDirective,
    DialogCustomWrapperComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
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
