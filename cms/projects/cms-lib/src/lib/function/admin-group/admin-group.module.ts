import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGroupSitemapSettingModalComponent } from './component/admin-group-sitemap-setting-modal/admin-group-sitemap-setting-modal.component';
import { AdminGroupMenuSettingModalComponent } from './component/admin-group-menu-setting-modal/admin-group-menu-setting-modal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminGroupSitemapSettingModalComponent,
    AdminGroupMenuSettingModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    AdminGroupSitemapSettingModalComponent,
    AdminGroupMenuSettingModalComponent,
  ]
})
export class AdminGroupModule { }
