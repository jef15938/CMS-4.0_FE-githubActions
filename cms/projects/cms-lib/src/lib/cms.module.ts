import { NgModule, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './function/shared/shared.module';
import { CmsRoutingModule } from './cms-routing.module';
import { CmsComponent } from './cms.component';
import { MenuNodeComponent } from './global/layouts/menu-node.component';
import { WithCredentialsInterceptor, HttpError401Interceptor, ManageHttpInterceptor } from './global/interceptor/cms-http-interceptor';
import { CmsAuthGuard, CmsCanDeactiveGuard, DialogFlowMessengerService, CmsUserMenuResolver, CmsLoadingToggle } from './global/service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CmsDateAdapter, CMS_DATE_FORMATS_DATETIME, CmsDateTimeAdapter } from './global/util/mat-date/mat-date';
import { DynamicRoutingComponent } from './global/component/dynamic-routing/dynamic-routing.component';
import { CmsFarmDataResolver } from './global/service/cms-farm-data-resolver.service';
import { FARM_PLUGIN_TOKEN } from './function/ui/farm-shared/farm-shared-injection-token';
import { AdminGroupModule } from './function/admin-group/admin-group.module';
import { NgxMatDateAdapter, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { CmsErrorHandler } from './global/error-handling';
import { ModalService } from './function/ui';
import { SliderService } from './global/api/service/slider/slider.service';
import { FarmPluginAdminGroup } from './global/plugin/farm/farm-plugin-admin-group';
import { FarmPluginSlider } from './global/plugin/farm/farm-plugin-slider';

const LAYOUTS = [
  MenuNodeComponent,
];

@NgModule({
  imports: [
    CmsRoutingModule,
    SharedModule,
    AdminGroupModule,
  ],
  exports: [
    // SharedModule
  ],
  declarations: [
    CmsComponent,
    ...LAYOUTS,
    DynamicRoutingComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },
    { provide: DateAdapter, useClass: CmsDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CMS_DATE_FORMATS_DATETIME },
    { provide: NgxMatDateAdapter, useClass: CmsDateTimeAdapter, deps: [DateAdapter] },
    { provide: NGX_MAT_DATE_FORMATS, useValue: CMS_DATE_FORMATS_DATETIME },
  ]
})
export class CmsModule {

  constructor(modalService: ModalService) {
    CmsErrorHandler.registerModalService(modalService);
  }

  static forRoot(providers = []): ModuleWithProviders<CmsModule> {
    return {
      ngModule: CmsModule,
      providers: [
        { provide: ErrorHandler, useClass: CmsErrorHandler },
        CmsLoadingToggle,
        CmsAuthGuard,
        CmsCanDeactiveGuard,
        DialogFlowMessengerService,
        CmsUserMenuResolver,
        CmsFarmDataResolver,
        { provide: FARM_PLUGIN_TOKEN, useClass: FarmPluginSlider, multi: true, deps: [SliderService, ModalService] },
        { provide: FARM_PLUGIN_TOKEN, useClass: FarmPluginAdminGroup, multi: true, deps: [ModalService] },
        { provide: HTTP_INTERCEPTORS, useClass: WithCredentialsInterceptor, multi: true, },
        { provide: HTTP_INTERCEPTORS, useClass: HttpError401Interceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ManageHttpInterceptor, multi: true },
        { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },
        { provide: DateAdapter, useClass: CmsDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: CMS_DATE_FORMATS_DATETIME },
        { provide: NgxMatDateAdapter, useClass: CmsDateTimeAdapter, deps: [DateAdapter] },
        { provide: NGX_MAT_DATE_FORMATS, useValue: CMS_DATE_FORMATS_DATETIME },
      ]
    };
  }
}
