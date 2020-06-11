import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropperComponent } from './cropper.component';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { CropperService } from './cropper.service';
import { PipeModule } from '../../pipe/pipe.module';

@NgModule({
  declarations: [CropperComponent],
  imports: [
    CommonModule,
    PipeModule,
    AngularCropperjsModule,
  ],
})
export class CropperModule {
  static forRoot(providers = []): ModuleWithProviders {
    return {
      ngModule: CropperModule,
      providers: [
        CropperService,
      ]
    };
  }
}
