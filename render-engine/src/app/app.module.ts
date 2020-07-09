import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RenderModule, WrapperModule, RENDER_APP_SHELL_NO_RENDER_COMPONENT_IDS_TOKEN } from '@render';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RENDER_APP_SHELL_NO_RENDER_COMPONENT_IDS } from './global/const/render-app-shell-no-render-component-ids';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RenderModule,
    WrapperModule,
  ],
  providers: [
    ...RenderModule.forRoot().providers,
    { provide: RENDER_APP_SHELL_NO_RENDER_COMPONENT_IDS_TOKEN, useValue: RENDER_APP_SHELL_NO_RENDER_COMPONENT_IDS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
