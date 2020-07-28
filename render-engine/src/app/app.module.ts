import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RenderModule, WrapperModule, RENDER_APP_SHELL_NO_RENDER_COMPONENT_IDS_TOKEN } from '@neux/render';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RENDER_APP_SHELL_NO_RENDER_COMPONENT_IDS } from './global/const/render-app-shell-no-render-component-ids';
import { API_CONFIG_TOKEN, API_HEADER_TOKEN } from '@neux/core';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { GlobalHeader } from 'src/app/global/common/global-header';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    RenderModule,
    HttpClientModule,
    WrapperModule,
  ],
  providers: [
    ...RenderModule.forRoot().providers,
    { provide: RENDER_APP_SHELL_NO_RENDER_COMPONENT_IDS_TOKEN, useValue: RENDER_APP_SHELL_NO_RENDER_COMPONENT_IDS },
    { provide: API_CONFIG_TOKEN, useValue: environment },
    { provide: API_HEADER_TOKEN, useExisting: GlobalHeader }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
