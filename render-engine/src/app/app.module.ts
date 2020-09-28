import { NgModule, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { API_CONFIG_TOKEN, API_HEADER_TOKEN } from '@neux/core';
import {
  RenderModule, WrapperModule, RENDER_APP_SHELL_NO_RENDER_COMPONENT_IDS_TOKEN, RENDER_ENVIROMENT_TOKEN,
  GTagService, BrowserStateInterceptor
} from '@neux/render';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RENDER_APP_SHELL_NO_RENDER_COMPONENT_IDS } from './global/const/render-app-shell-no-render-component-ids';
import { ErrorPageComponent } from 'src/app/global/component/error-page/error-page.component';
import { environment } from 'src/environments/environment';
import { GlobalHeader } from 'src/app/global/common/global-header';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    RenderModule,
    HttpClientModule,
    WrapperModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    TransferHttpCacheModule,
  ],
  providers: [
    ...RenderModule.forRoot().providers,
    { provide: 'API_BASE_URL', useValue: environment.apiBaseUrl },
    { provide: RENDER_APP_SHELL_NO_RENDER_COMPONENT_IDS_TOKEN, useValue: RENDER_APP_SHELL_NO_RENDER_COMPONENT_IDS },
    { provide: API_CONFIG_TOKEN, useValue: environment },
    { provide: RENDER_ENVIROMENT_TOKEN, useValue: environment },
    { provide: API_HEADER_TOKEN, useExisting: GlobalHeader },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BrowserStateInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) platformId: any,
    gTagService: GTagService,
  ) {
    gTagService.init(platformId, environment?.google?.GA_TRACKING_ID);
  }
}
