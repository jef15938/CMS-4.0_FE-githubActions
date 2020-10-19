import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { API_CONFIG_TOKEN, API_HEADER_TOKEN } from '@neux/core';
import { RENDER_CUSTOM_COMPONENT_MAPPINGS_TOKEN, RenderModule, RENDER_ENVIROMENT_TOKEN } from '@neux/render';
import {
  CmsModule, CMS_ENVIROMENT_TOKEN
} from '@neux/cms-core';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalHeader } from './global/common/global-header';
import { COMPONENT_MAPPINGS } from './global/common/component-mapping';
import { FarmCustomFormControlComponent } from './function/farm-custom-form-control/farm-custom-form-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FarmCustomFormControlComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CmsModule.forRoot(),
  ],
  providers: [
    ...RenderModule.forRoot().providers,
    { provide: 'API_BASE_URL', useValue: environment.apiBaseUrl },
    { provide: CMS_ENVIROMENT_TOKEN, useValue: environment },
    { provide: RENDER_ENVIROMENT_TOKEN, useValue: environment },
    { provide: RENDER_CUSTOM_COMPONENT_MAPPINGS_TOKEN, useValue: COMPONENT_MAPPINGS },
    { provide: API_CONFIG_TOKEN, useValue: environment },
    { provide: API_HEADER_TOKEN, useExisting: GlobalHeader },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
