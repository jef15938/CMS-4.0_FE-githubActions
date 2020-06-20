import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsRoutingModule } from './cms-routing.module';
import { CmsComponent } from './cms.component';
import { CmsUserMenuResolver } from './service/cms-menu-resolver';
import { MenuNodeComponent } from './layouts/menu-node.component';
import { ModalModule } from '../ui/modal/modal.module';
import { SharedModule } from '../shared/shared.module';
import { ContentEditorModule } from '../ui/content-editor/content-editor.module';
import { HtmlEditorModule } from '../ui/html-editor/html-editor.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WithCredentialsInterceptor } from './interceptor/cms-http-interceptor';

const LAYOUTS = [
  MenuNodeComponent,
];

@NgModule({
  imports: [
    CommonModule,
    CmsRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    SharedModule
  ],
  declarations: [
    CmsComponent,
    ...LAYOUTS
  ],
  providers: [
    CmsUserMenuResolver,
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
        ...(ModalModule.forRoot().providers),
        ...(ContentEditorModule.forRoot().providers),
        ...(HtmlEditorModule.forRoot().providers),
      ]
    };
  }
}
