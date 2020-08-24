import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './function/shared/shared.module';
import { CmsRoutingModule } from './cms-routing.module';
import { CmsComponent } from './cms.component';
import { MenuNodeComponent } from './global/layouts/menu-node.component';
import { WithCredentialsInterceptor, HttpErrorInterceptor, HttpError401Interceptor } from './global/interceptor/cms-http-interceptor';
import { CmsAuthGuard, CmsCanDeactiveGuard, DialogFlowMessengerService, CmsUserMenuResolver } from './global/service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CmsDateAdapter, CMS_DATE_FORMATS_DATETIME, CmsDateTimeAdapter } from './global/util/mat-date/mat-date';
import { DynamicRoutingComponent } from './global/component/dynamic-routing/dynamic-routing.component';
import { CmsFarmDataResolver } from './global/service/cms-farm-data-resolver.service';
import { FARM_TABLE_ACTION_TOKEN } from './function/ui/farm-shared/farm-shared-injection-token';
import { AdminGroupTableAction } from './function/admin-group/admin-group-table-action';
import { AdminGroupModule } from './function/admin-group/admin-group.module';
import { NgxMatDateAdapter, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';

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
  static forRoot(providers = []): ModuleWithProviders<CmsModule> {
    return {
      ngModule: CmsModule,
      providers: [
        CmsAuthGuard,
        CmsCanDeactiveGuard,
        DialogFlowMessengerService,
        CmsUserMenuResolver,
        CmsFarmDataResolver,
        {
          provide: FARM_TABLE_ACTION_TOKEN, multi: true,
          useValue: AdminGroupTableAction,
        },
        {
          provide: HTTP_INTERCEPTORS, multi: true,
          useClass: WithCredentialsInterceptor
        },
        {
          provide: HTTP_INTERCEPTORS, multi: true,
          useClass: HttpErrorInterceptor
        },
        {
          provide: HTTP_INTERCEPTORS, multi: true,
          useClass: HttpError401Interceptor
        },
        { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },
        { provide: DateAdapter, useClass: CmsDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: CMS_DATE_FORMATS_DATETIME },
        { provide: NgxMatDateAdapter, useClass: CmsDateTimeAdapter, deps: [DateAdapter] },
        { provide: NGX_MAT_DATE_FORMATS, useValue: CMS_DATE_FORMATS_DATETIME },
      ]
    };
  }
}
