import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '@cms-lib/shared/shared.module';
import { CmsRoutingModule } from './cms-routing.module';
import { CmsComponent } from './cms.component';
import { MenuNodeComponent } from './layouts/menu-node.component';
import { WithCredentialsInterceptor } from './interceptor/cms-http-interceptor';
import { CmsAuthGuard, DialogFlowMessengerService, CmsUserMenuResolver } from './service';

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
    ...LAYOUTS
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, multi: true,
      useClass: WithCredentialsInterceptor
    }
  ]
})
export class CmsModule {
  static forRoot(providers = []): ModuleWithProviders {
    return {
      ngModule: CmsModule,
      providers: [
        CmsAuthGuard,
        DialogFlowMessengerService,
        CmsUserMenuResolver,
        {
          provide: HTTP_INTERCEPTORS, multi: true,
          useClass: WithCredentialsInterceptor
        }
      ]
    };
  }
}
