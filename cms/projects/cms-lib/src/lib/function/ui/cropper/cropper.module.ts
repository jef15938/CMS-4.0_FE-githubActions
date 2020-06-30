import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { PipeModule } from './../../../global/pipe';
import { CropperComponent } from './cropper.component';
import { CropperMenuSettingComponent } from './component/menu/cropper-menu-setting/cropper-menu-setting.component';
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
}
