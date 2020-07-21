import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './function/shared/shared.module';
import { CmsRoutingModule } from './cms-routing.module';
import { CmsComponent } from './cms.component';
import { MenuNodeComponent } from './global/layouts/menu-node.component';
import { WithCredentialsInterceptor } from './global/interceptor/cms-http-interceptor';
import { CmsAuthGuard, CmsCanDeactiveGuard, DialogFlowMessengerService, CmsUserMenuResolver } from './global/service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { CmsDateAdapter, CMS_DATE_FORMATS_DATETIME } from './global/util/mat-date/mat-date';
import { DynamicRoutingComponent } from './global/component/dynamic-routing/dynamic-routing.component';
import { CmsFarmDataResolver } from './global/service/cms-farm-data-resolver.service';

const LAYOUTS = [
  MenuNodeComponent,
];

@NgModule({
  imports: [
    CmsRoutingModule,
    SharedModule,
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
    {
      provide: HTTP_INTERCEPTORS, multi: true,
      useClass: WithCredentialsInterceptor
    },
    { provide: DateAdapter, useClass: CmsDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CMS_DATE_FORMATS_DATETIME }
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
          provide: HTTP_INTERCEPTORS, multi: true,
          useClass: WithCredentialsInterceptor
        },
        { provide: DateAdapter, useClass: CmsDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: CMS_DATE_FORMATS_DATETIME }
      ]
    };
  }
}
