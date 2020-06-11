import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropperComponent } from './cropper.component';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { CropperService } from './cropper.service';
import { PipeModule } from '../../pipe/pipe.module';
import { CropperMenuSettingComponent } from './component/menu/cropper-menu-setting/cropper-menu-setting.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CropperMenuEditComponent } from './component/menu/cropper-menu-edit/cropper-menu-edit.component';

@NgModule({
  declarations: [
    CropperComponent,
    CropperMenuSettingComponent,
    CropperMenuEditComponent,
  ],
  imports: [
    CommonModule,
    PipeModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
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
